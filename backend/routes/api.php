<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 🟢 Đăng ký & Đăng nhập (không cần token)
Route::post('/register', [UserController::class, 'register']);
Route::post('/login',    [UserController::class, 'login']);
Route::post('/forgot-password', [UserController::class, 'forgotPassword']);

// 🟢 Các API cần đăng nhập (có token Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function ($request) {
        return $request->user();
    });

    Route::put('/user/update', [UserController::class, 'updateProfile']);
    Route::put('/user/change-password', [UserController::class, 'changePassword']);
});
