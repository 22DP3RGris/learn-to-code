<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
           'username' => 'required|string|max:55',

           'email' => 'required|string|email|max:255|unique:users,email',

           'phone' => 'required|string|max:15',

           'password' => 'required|string|min:8|confirmed',
        ];
    }
}
