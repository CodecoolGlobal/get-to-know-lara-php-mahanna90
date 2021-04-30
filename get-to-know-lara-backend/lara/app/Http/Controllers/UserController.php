<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Validate user login data, validate password, then create token for user session.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|Response
     */
    function login(Request $request): Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        try{
            $request->validate([
                'email' => 'required|email',
                'password' => 'required']);
        }
        catch (Exception $exception){
            return response([
                'message' => 'Validation failed. Data format is not accepted or missing data.'
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => 'These credentials do not match our records.'
            ], Response::HTTP_NOT_FOUND);
        }

        $token = $user->createToken('my-app-token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, Response::HTTP_CREATED);
    }

    /**
     * Validate user registration, create user with hashed password.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function register(Request $request): Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        try{
            $request->validate([
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required']);
        }
        catch (Exception $exception){
            $response = [
                'success' => false,
                'message' => 'Registration error, input validation failed: missing or not correctly formatted data.'
            ];
            return response($response, Response::HTTP_BAD_REQUEST);
        }
        User::firstOrCreate([
            "name" => $request->get('name'),
            "email" => $request->get('email'),
            "password" => Hash::make( $request->get('password'))]);
        $response = [
            'success' => true,
            'message' => 'Registration successful.'
        ];

        return response($response, Response::HTTP_CREATED);
    }

    /**
     * Delete user access token and logout user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function logout(Request $request): Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        try {
            auth()->user()->tokens()->delete();
        } catch (Exception $exception) {
            $response = [
                'success' => false,
                'message' => 'Logout error: token does not exist or cannot be deleted.'
            ];
            return response($response, Response::HTTP_UNAUTHORIZED);
        }
        $response = [
            'success' => true,
            'message' => 'User successfully logged out.'
        ];

        return response($response, Response::HTTP_ACCEPTED);
    }

    /**
     * Display the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): Response
    {
        $user = User::find($id);

        return response($user, Response::HTTP_OK);
    }


    /**
     * Validate current user by token and by user id.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function validateToken(Request $request): Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $userIdToValidate = $request->user()->id;
        $sessionUserId = $this->getCurrentUser()->tokenable_id;

        if ($sessionUserId === $userIdToValidate) {
            $response = [
                'isAuthenticated' => true,
                'message' => "User token matches!",
            ];
            return response($response, Response::HTTP_ACCEPTED);
        }
        $response = [
            'isAuthenticated' => false,
            'message' => "User token doesn't match!",
        ];

        return response($response, Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Find the active user by latest access token.
     *
     * @return \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Query\Builder|object|null
     */
    public function getCurrentUser()
    {
        return DB::table('personal_access_tokens')->latest()->first();
    }


    /**
     * Find email sender and receiver by email data.
     *
     * @param \App\Models\Mail $mail
     * @return object
     */
    public function getUsers(Mail $mail): object
    {
        $sender = $mail->userFrom()->first();
        $receiver = $mail->userTo()->first();
        return (object) array("sender" => $sender, "receiver" => $receiver);
    }

    /**
     * Update the specified user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


}
