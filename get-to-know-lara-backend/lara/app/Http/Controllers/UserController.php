<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
            $validation = $request->validate([
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required']);
        }
        catch (\Exception $exception){
            return response()->json("error", Response::HTTP_BAD_REQUEST);
        }

        User::firstOrCreate([
            "name" => $request->get('name'),
            "email" => $request->get('email'),
            "password" => Hash::make( $request->get('password'))]);

//        return response()->json([
//            'status_code' => 200,
//            'message' => 'User created successfully'
//        ]);

        $response = [
            'message' => 'User created successfully'
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
        //
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
}
