<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('authActions', function($request) {
            return Limit::perMinute(15)->by($request->ip());
        });

        RateLimiter::for('createActions', function($request) {
            return Limit::perMinute(5)->by($request->user()->id);
        });

        RateLimiter::for('deleteActions', function($request) {
            return Limit::perMinute(25)->by($request->user()->id);
        });


        Passport::tokensExpireIn(now()->addMinutes(15));
        Passport::refreshTokensExpireIn(now()->addDays(30));
        Passport::enablePasswordGrant();
    }
}
