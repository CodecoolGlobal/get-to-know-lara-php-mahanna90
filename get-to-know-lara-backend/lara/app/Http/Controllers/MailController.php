<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use App\Models\User;
use Illuminate\Http\Request;

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

    public function inbox(Request $request)
    {
        return Mail::where('id_user_to', $request->get('id'))->orderBy('sent', 'DESC')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        return Mail::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showEmail($id)
    {
        //
        return Mail::find($id);
    }

    public function showByUser(Request $request)
    {
        return Mail::where('id_user_from', $request->get('id'))->orderBy('sent', 'DESC')->get();

//        $user = User::find($id);
//        $mails = $user->mails()->orderBy('sent', 'DESC')->get();
////        dd($mails);
//        return $mails;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        Mail::where('id', $request->get('id'))->update([
            'is_read' => $request->get('is_read')
        ]);
//        $mail = Mail::find($request->get('id'));
//        $mail->update($request->get('is_read'));
        return Mail::find($request->get('id'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return Mail::destroy($id);
    }
}
