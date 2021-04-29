<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function login(Request $request)
    {
        try{
            $validation = $request->validate([
                'email' => 'required|email',
                'password' => 'required']);
        }
        catch (\Exception $exception){
            return response()->json("error", Response::HTTP_BAD_REQUEST);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => ['These credentials do not match our records.']
            ], Response::HTTP_NOT_FOUND);
        }

        $token = $user->createToken('my-app-token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, Response::HTTP_CREATED);
    }

    public function register(Request $request)
    {
        try{
            $request->validate([
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required']);
        }
        catch (\Exception $exception){
            $response = [
                'success' => false,
                'message' => 'Registration error: ' . $exception->getMessage()
            ];
            return response($response, Response::HTTP_BAD_REQUEST);
        }
        User::firstOrCreate([
            "name" => $request->get('name'),
            "email" => $request->get('email'),
            "password" => Hash::make( $request->get('password'))]);
        $response = [
            'success' => true,
            'message' => 'Registration successful'
        ];

        return response($response, Response::HTTP_CREATED);
    }

    public function logout(Request $request)
    {
        try {
            auth()->user()->tokens()->delete();
        } catch (\Exception $exception) {
            $response = [
                'success' => false,
                'message' => 'Logout error'
            ];
            return response($response, Response::HTTP_UNAUTHORIZED);
        }
        $response = [
            'success' => true,
            'message' => 'User logged out'
        ];

        return response($response, Response::HTTP_ACCEPTED);
    }




    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
//        return User::where('id', $id)->get()->first();
    }


    public function findByEmail($email) {
        return User::where('email', $email)->get()->first();
    }

    /**
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function validateToken(Request $request) {
        return $request->user();
    }


}
