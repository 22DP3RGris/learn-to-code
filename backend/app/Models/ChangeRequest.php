<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChangeRequest extends Model
{
    use HasFactory;

    protected $table = 'topic_change_requests';

    protected $fillable = [
        'language_id',
        'topic_id',
        'user_id',
        'title',
        'description',
        'difficulty',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function language()
    {
        return $this->belongsTo(ProgrammingLanguage::class, 'language_id');
    }
}
