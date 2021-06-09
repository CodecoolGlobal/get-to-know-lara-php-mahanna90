<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MailController extends Controller
{
    /**
     * Display all emails.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        $allMails = Mail::all()->sortByDesc("sent");

        return response($allMails, Response::HTTP_OK);
    }

    /**
     * Show emails received by the request user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function inbox(Request $request): Response
    {
        $user = $request->user();
        $user->load("mailsReceived");
        $mailsReceived = $user->mailsReceived()->orderBy('sent', 'DESC')->get()->all();
        foreach($mailsReceived as $mail) {
            $sender = $mail->userFrom()->first();
            $mail["sender"] = $sender;
        }

        return response($mailsReceived,Response::HTTP_OK);
    }

    /**
     * Store a newly created email in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): Response
    {
        try{
            $request->validate([
                'subject' => 'required',
                'email' => 'required|email',
                'message' => 'required',
                'id_user_from' => 'required']);
        }
        catch (Exception $exception){
            $response = [
                'success' => false,
                'message' => 'Error during email sending: ' . $exception->getMessage()
            ];
            return response($response, Response::HTTP_BAD_REQUEST);
        }

        $targetUser = User::findByEmail($request->get('email'));
        if (!$targetUser) {
            $response = [
                'success' => false,
                'message' => "User " . $request->get('email') . " does not exist!"
            ];
            return response($response, Response::HTTP_NOT_FOUND);
        }
        $mail["id_user_from"] = $request->get("id_user_from");
        $mail["id_user_to"] = $targetUser->id;
        $mail["subject"] = $request->get("subject");
        $mail["message"] = $request->get("message");
        $response = Mail::create($mail);

        return response($response, Response::HTTP_CREATED);
    }

    /**
     * Display the details of a specified email.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function showEmail(int $id): Response
    {
        Mail::where('id', $id)->update(['is_read' => 1]);
        $mail = Mail::find($id);
        $sender = $mail->userFrom()->first();
        $target = $mail->userTo()->first();
        $mail["sender"] = $sender;
        $mail["target"] = $target;

        return response($mail, Response::HTTP_OK);
    }

    /**
     * Show emails sent by the request user.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function showByUser(Request $request): Response
    {
        $user = $request->user();
        $user->load("mailsSent");
        $sentMails = $user->mailsSent()->orderBy('sent', 'DESC')->get()->all();
        foreach($sentMails as $mail) {
            $target = $mail->userTo()->first();
            $mail["target"] = $target;
        }

        return response($sentMails, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(int $id): Response
    {
        $currentStatus = Mail::find($id);
        Mail::where('id', $id)->update([
            'is_read' => !$currentStatus->is_read
        ]);
        $updatedMail = Mail::find($id);
        $sender = $updatedMail->userFrom()->first();
        $target = $updatedMail->userTo()->first();
        $updatedMail["sender"] = $sender;
        $updatedMail["target"] = $target;

        return response($updatedMail, Response::HTTP_ACCEPTED);
    }


    /**
     * Checks if user is the sender of the current email.
     *
     * @param $user
     * @param $mailId
     * @return bool
     */
    public function checkIfUserIsSender($user, $mailId): bool
    {
        $mailToDelete = Mail::where('id', $mailId)->get()->first();

        return $user->id === $mailToDelete->id_user_from;
    }


    /**
     * Checks if user is the receiver of the current email.
     *
     * @param $user
     * @param $mailId
     * @return bool
     */
    public function checkIfUserIsReceiver($user, $mailId): bool
    {
        $mailToDelete = Mail::where('id', $mailId)->get()->first();

        return $user->id === $mailToDelete->id_user_to;
    }


    /**
     * Mark the specified resource in storage as deleted.
     *
     * @param \Illuminate\Http\Request $request
     * @param $mailId
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $mailId): Response
    {
        $user = $request->user();
        $isSender = $this->checkIfUserIsSender($user, $mailId);
        $isReceiver = $this->checkIfUserIsReceiver($user, $mailId);
        $updated = null;

        if ($isSender) {
            $updated = Mail::where('id', $mailId)->update(['deleted_by_sender' => 1]);
            // Additional check needed for the case when users send email to themselves
            if ($isReceiver) {
                $updated = Mail::where('id', $mailId)->update(['deleted_by_target' => 1]);
            }
        } elseif ($isReceiver){
            $updated = Mail::where('id', $mailId)->update(['deleted_by_target' => 1]);
        }

        if ($updated) {
            $response = [
                'deleted' => true,
                'message' => "Email was deleted by " . ($isSender ? "sender" : "target"),
            ];
            return response($response, Response::HTTP_ACCEPTED);
        }
        $response = [
            'deleted' => false,
            'message' => "Email could not be deleted!",
        ];
        return response($response, Response::HTTP_CONFLICT);
    }


}
