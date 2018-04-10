<?php
/*
 * Plugin Name: LSPNotificationBar
 * Version: 0.1
 * Plugin URI: http://www.lsp-sports.de/
 * Description: This will add a notification bar whereever the shortcode is placed.
 * Author: Christoph Hess
 * Author URI: http://www.hughlashbrooke.com/
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: lsp-notification-bar
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author Christoph Hess
 * @since 0.1.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Load plugin class files
require_once( 'includes/class-lsp-notification-bar.php' );
require_once( 'includes/class-lsp-notification-bar-settings.php' );

// Load plugin libraries
require_once( 'includes/lib/class-lsp-notification-bar-admin-api.php' );
require_once( 'includes/lib/class-lsp-notification-bar-post-type.php' );
require_once( 'includes/lib/class-lsp-notification-bar-taxonomy.php' );

/**
 * Returns the main instance of LSPNotificationBar to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object LSPNotificationBar
 */
function LSPNotificationBar () {
	$instance = LSPNotificationBar::instance( __FILE__, '1.0.0' );

	if ( is_null( $instance->settings ) ) {
		$instance->settings = LSPNotificationBar_Settings::instance( $instance );
	}

	return $instance;
}

LSPNotificationBar();