<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function () {
    $user = User::create([
        "name" => "Sherlock Holmes",
        "email" => "sherlock@holmes.com",
        "password" => "password",
    ]);
    return $user;
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
