<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function Illuminate\Events\queueable;

class MailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get all emails
        return Mail::all()->sortByDesc("sent");
    }

    /**
     * @param Request $request
     * @return Mail[]|\Illuminate\Database\Eloquent\Collection
     */
    public function inbox(Request $request)
    {
        $mails = Mail::where('id_user_to', $request->get('id'))->orderBy('sent', 'DESC')->get();
        foreach($mails as $mail) {
            $userController = new UserController();
//            $sender = User::find($mail->id_user_from);
            $sender = $userController->show($mail->id_user_from);
            $mail["sender"] = $sender;
        }
        return $mails;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'subject' => 'required',
                'email' => 'required|email',
                'message' => 'required',
                'id_user_from' => 'required']);
        }
        catch (\Exception $exception){
            $response = [
                'success' => false,
                'message' => 'Error during email sending: ' . $exception->getMessage()
            ];
            return response($response, Response::HTTP_BAD_REQUEST);
        }

        $userController = new UserController();
        $targetUser = $userController->findByEmail($request->get('email'));
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
        $mail["is_read"] = false;
        $mail["sent"] = NOW();
        $mail["deleted_by_sender"] = false;
        $mail["deleted_by_target"] = false;

        return Mail::create($mail);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function showEmail($id)
    {
        Mail::where('id', $id)->update(['is_read' => 1]);
        $mail = Mail::find($id);
        $userController = new UserController();
        $sender = $userController->show($mail->id_user_from);
        $mail["sender"] = $sender;
        $target = $userController->show($mail->id_user_to);
        $mail["target"] = $target;

        return $mail;
    }

    /**
     * @param Request $request
     * @return Mail[]|\Illuminate\Database\Eloquent\Collection
     */
    public function showByUser(Request $request)
    {
        $sentMails = Mail::where('id_user_from', $request->get('id'))->orderBy('sent', 'DESC')->get();

        foreach($sentMails as $mail) {
            $target = User::find($mail->id_user_to);
            $mail["target"] = $target;
        }

        return $sentMails;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $currentStatus = Mail::find($id);
        Mail::where('id', $id)->update([
            'is_read' => !$currentStatus->is_read
        ]);
//        $mail = Mail::find($request->get('id'));
//        $mail->update($request->get('is_read'));
        $updatedMail = Mail::find($id);

        $userController = new UserController();
        $sender = $userController->show($updatedMail->id_user_from);
        $updatedMail["sender"] = $sender;
        $target = $userController->show($updatedMail->id_user_to);
        $updatedMail["target"] = $target;

        return $updatedMail;
    }

    public function checkIfUserIsSender($user, $mailId) {
        $mailToDelete = Mail::where('id', $mailId)->get()->first();

        return $user->id === $mailToDelete->id_user_from;
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $mailId)
    {
        $user = $request->user();
        $isSender = $this->checkIfUserIsSender($user, $mailId);

        if ($isSender) {
            $updated = Mail::where('id', $mailId)->update(['deleted_by_sender' => 1]);
        } else {
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
