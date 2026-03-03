<?php

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $this->withoutExceptionHandling();
    $response = $this->post(route('register'), [
        'name' => 'Test User',
        'entreprise_name' => 'Test Entreprise',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasNoErrors();
    
    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});