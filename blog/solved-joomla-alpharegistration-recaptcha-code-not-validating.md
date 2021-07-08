---
author: kaustav
comments: true
date: 2009-12-07
layout: post
slug: solved-joomla-alpharegistration-recaptcha-code-not-validating
title: '[SOLVED] Joomla AlphaRegistration ReCaptcha code not validating'
categories:
- Joomla
---




If you are using AlphaRegistration 2.0.9 for user registration in Joomla 1.5.14, it is quite likely that you face some sort of problems with displaying or validating ReCaptcha, even if you have correct configuration, i.e., with valid public and private keys.For me, ReCaptcha was showing up on the website, but was accepting _any code_ typed in to be correct. However, it was showing proper error code if the Recaptcha field was left blank.

After some searching, I came across a piece of code modification which a user named galaxidesigns had suggested in the AlphaPlug forum in [this thread](http://www.alphaplug.com/index.php/forum.html?func=view&catid=29&id=7611&limit=6&start=6#8017). Though the issue here was somewhat different, nevertheless, it worked.<!-- more -->



So the solution was:
edit _components/com_alpharegistration/views/register/view.html.php_
Change the following code around line#92:


<blockquote>`// reCaptcha script`
` /*`
` if ( $arg_params->def( 'userecaptcha', 1 ) ) { `
` $paramsReCaptcha = "var RecaptchaOptions = {`
`    theme : '".$arg_params->get( 'themerecaptcha' )."',`
`    lang  : '". substr($lang, 0, 2)."'`
` };";`
` $document->addScriptDeclaration($paramsReCaptcha, ''); `
` }`
` */`
` /*`
` if ( $arg_params->def( 'userecaptcha', 1 ) ) { `
` $document->addScript( "http://api.recaptcha.net/js/recaptcha_ajax.js" ); `
` $paramsReCaptcha = "`
` window.onload = function () {`
` Recaptcha.create('". $arg_params->get( 'pubkey' )."',`
` 'recaptcha_div', {`
`  theme: '". $arg_params->get( 'themerecaptcha', 'red' )."',`
`  lang  : '". substr($lang, 0, 2)."',`
`  callback: Recaptcha.focus_response_field`
` });`
` }"`
` ;`
` $document->addScriptDeclaration($paramsReCaptcha, '');`
` }`
` */`
`if ( $arg_params->def( 'userecaptcha', 1 ) ) {`
` $document->addScript( "http://api.recaptcha.net/js/recaptcha_ajax.js" );`
` $paramsReCaptcha = "`
` $(window).load(function(){`
` Recaptcha.create('". $arg_params->get( 'pubkey' )."',`
` 'recaptcha_div', {`
` theme: '". $arg_params->get( 'themerecaptcha', 'red' )."',`
` lang : '". substr($lang, 0, 2)."',`
` callback: Recaptcha.focus_response_field`
` });`
` })"`
` ;`
` $document->addScriptDeclaration($paramsReCaptcha, '');`
` } `</blockquote>


Change the code to this:


<blockquote>

// reCaptcha script

if ( $arg_params->def( 'userecaptcha', 1 ) ) {
$paramsReCaptcha = "var RecaptchaOptions = {
theme : '".$arg_params->get( 'themerecaptcha' )."',
lang  : '". substr($lang, 0, 2)."'
};";
$document->addScriptDeclaration($paramsReCaptcha, '');
}



if ( $arg_params->def( 'userecaptcha', 1 ) ) {
$document->addScript( "http://api.recaptcha.net/js/recaptcha_ajax.js" );
$paramsReCaptcha = "
window.onload = function () {
Recaptcha.create('". $arg_params->get( 'pubkey' )."',
'recaptcha_div', {
theme: '". $arg_params->get( 'themerecaptcha', 'red' )."',
lang  : '". substr($lang, 0, 2)."',
callback: Recaptcha.focus_response_field
});
}"
;
$document->addScriptDeclaration($paramsReCaptcha, '');
}

/*
if ( $arg_params->def( 'userecaptcha', 1 ) ) {
$document->addScript( "http://api.recaptcha.net/js/recaptcha_ajax.js" );
$paramsReCaptcha = "
$(window).load(function(){
Recaptcha.create('". $arg_params->get( 'pubkey' )."',
'recaptcha_div', {
theme: '". $arg_params->get( 'themerecaptcha', 'red' )."',
lang : '". substr($lang, 0, 2)."',
callback: Recaptcha.focus_response_field
});
})"
;
$document->addScriptDeclaration($paramsReCaptcha, '');
}
*/</blockquote>


What is being done here is that a piece of code which was previously commented is being uncommented and a similar code which was being used is commented instead.

Hope this helps.







