<?php

// app/Models/Student.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $primaryKey = 'student_id'; // Custom primary key

    protected $fillable = [
        'full_name',
        'email',
        'phone_number',
        'code',
        'year',
        'city',
        'specialty',
        'password',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
