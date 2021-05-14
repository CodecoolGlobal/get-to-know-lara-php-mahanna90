<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * Class Mail
 * @mixin \Illuminate\Database\Eloquent\Builder
 * @package App\Models
 */
class Mail extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user_from',
        'id_user_to',
        'subject',
        'message',
        'is_read',
        'sent',
        'deleted_by_sender',
        'deleted_by_target',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function userFrom()
    {
        return $this->hasOne(User::class, 'id', 'id_user_from');
    }

    public function userTo()
    {
        return $this->hasOne(User::class, 'id', 'id_user_to');
    }



}
