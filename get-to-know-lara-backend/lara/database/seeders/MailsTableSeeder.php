<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use League\CommonMark\Node\NodeWalker;

class MailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mails')->insert([
            'id_user_from' => 4,
            'id_user_to' => 7,
            'subject' => "First email to Joe",
            'message' => "Message text",
            'is_read' => false,
            'sent' => NOW(),
            'created_at' => NOW(),
            'updated_at' => NOW()
        ]);
    }
}
