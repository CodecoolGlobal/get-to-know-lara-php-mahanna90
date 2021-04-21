<?php


use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Mail;
use App\Http\Controllers\MailController;

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

Route::get('/user-test', function () {
    $users = User::all();

    dd($users);
//    return response($users, 200);
});

//Route::get('/mails', [MailController::class, 'index']);
Route::post('/mails', [MailController::class, 'store']);
//Route::put('/mails', [MailController::class, 'update']);
Route::delete('/mails', [MailController::class, 'destroy']);

Route::post('/registration', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/mails', [MailController::class, 'index']);
    Route::put('/mails', [MailController::class, 'update']);
//    Route::post('/logout', [UserController::class, 'logout']);
});

Route::post('/logout', [UserController::class, 'logout']);

//Route::resource('mails', 'MailController');

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
