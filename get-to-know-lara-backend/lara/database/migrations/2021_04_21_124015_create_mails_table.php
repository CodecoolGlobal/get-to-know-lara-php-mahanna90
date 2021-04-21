<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mails', function (Blueprint $table) {
            $table->id();

//            $table->integer('id_user_from')->unsigned()->nullable();
            $table->foreign('id_user_from')->references('id')->on('users');

//            $table->integer('id_user_to')->unsigned()->nullable();
            $table->foreign('id_user_to')->references('id')->on('users');

            $table->string('subject');
            $table->text('message');
            $table->boolean('is_read');
            $table->timestamp('sent')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mails');
    }
}
