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
    ];

    protected $casts = [
        'sent' => 'datetime',
        'is_read' => 'boolean',
    ];

//    public function users()
//    {
//        return $this->hasOne(User::class, 'id_user_from', 'mail_id');
//    }
}
