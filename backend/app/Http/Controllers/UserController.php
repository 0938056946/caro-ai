<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /** ========== ĐĂNG KÝ ========== */
    public function register(Request $request)
    {
        $v = Validator::make($request->all(), [
            'username' => 'required|string|max:50|unique:users',
            'password' => 'required|min:6|confirmed', // cần field password_confirmation
        ]);

        if ($v->fails()) {
            return response()->json(['status' => false, 'errors' => $v->errors()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'avatar'   => null,
        ]);

        return response()->json(['status' => true, 'message' => 'Đăng ký thành công!', 'data' => $user]);
    }

    /** ========== ĐĂNG NHẬP ========== */
    public function login(Request $request)
    {
        $v = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required',
        ]);

        if ($v->fails()) {
            return response()->json(['status' => false, 'errors' => $v->errors()], 422);
        }

        $user = User::where('username', $request->username)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['status' => false, 'message' => 'Sai username hoặc mật khẩu!'], 401);
        }

        // Nếu dùng Sanctum để tạo token
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Đăng nhập thành công!',
            'data' => ['user' => $user, 'token' => $token],
        ]);
    }

    /** ========== CHỈNH SỬA THÔNG TIN CÁ NHÂN ========== */
    public function updateProfile(Request $request)
    {
        $user = $request->user(); // user từ token

        $v = Validator::make($request->all(), [
            'username' => 'sometimes|string|max:50|unique:users,username,' . $user->id,
            'avatar'   => 'nullable|string',
        ]);

        if ($v->fails()) {
            return response()->json(['status' => false, 'errors' => $v->errors()], 422);
        }

        $user->update($request->only('username', 'avatar'));

        return response()->json(['status' => true, 'message' => 'Cập nhật thành công!', 'data' => $user]);
    }

    /** ========== ĐỔI MẬT KHẨU ========== */
    public function changePassword(Request $request)
    {
        $v = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        if ($v->fails()) {
            return response()->json(['status' => false, 'errors' => $v->errors()], 422);
        }

        $user = $request->user();

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['status' => false, 'message' => 'Mật khẩu cũ không đúng!'], 400);
        }

        $user->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['status' => true, 'message' => 'Đổi mật khẩu thành công!']);
    }

    /** ========== QUÊN MẬT KHẨU ========== */
    public function forgotPassword(Request $request)
    {
        $v = Validator::make($request->all(), [
            'username' => 'required|string|exists:users,username',
            'new_password' => 'required|min:6|confirmed',
        ]);

        if ($v->fails()) {
            return response()->json(['status' => false, 'errors' => $v->errors()], 422);
        }

        $user = User::where('username', $request->username)->first();
        $user->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['status' => true, 'message' => 'Đặt lại mật khẩu thành công!']);
    }
}
