<?php

namespace App\Support\Logs;

use Spatie\Activitylog\Contracts\Activity;
use Illuminate\Support\Facades\Request;

class UserAgentAndIpTap
{
    public function __invoke(Activity $activity, string $eventName)
    {
        $activity->properties = $activity->properties->put('ip', Request::ip());
        $activity->properties = $activity->properties->put('user_agent', Request::userAgent());
    }
}
