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

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::get('/validate-token', [UserController::class, 'validateToken']);
    Route::get('/mails', [MailController::class, 'index']);
    Route::get('/mails/inbox', [MailController::class, 'inbox']);
//    Route::put('/mails', [MailController::class, 'update']);
    Route::delete('/mails', [MailController::class, 'destroy']);
    Route::get('/mails/sent', [MailController::class, 'showByUser']);
    Route::post('/mails/compose', [MailController::class, 'store']);
    Route::get('/mails/view/{id}', [MailController::class, 'showEmail']);
    Route::put('/mails/mark-as-unread/{id}', [MailController::class, 'update']);
    Route::post('/logout', [UserController::class, 'logout']);
});

//Route::resource('mails', MailController::class);

