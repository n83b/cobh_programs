<?php 
/*
Plugin Name: COBH Program Finder
Plugin URI: http://websector.com.au
Description: 
Version: 1.0.0
Author: WSR
Author URI: http://websector.com.au
License: A short license name. Example: GPL2
	Helpers:
	File system path to plugin:  plugin_dir_path(__FILE__);
	URL to plugin:  plugins_url(__FILE__)
*/


defined( 'ABSPATH' ) or die( 'No script kiddies please!' );


if( !defined( 'COBH_PROGRAM_VER' ) )
	define( 'COBH_PROGRAM_VER', '1.0.0' );



// 4. Include ACF
include_once( plugin_dir_path(__FILE__) . '/acf/acf.php' );
include_once( plugin_dir_path(__FILE__) . 'cobh-acf-fields.php');


// Start up the engine
if ( !class_exists( 'COBH_program' ) ) {
class COBH_program{


		static $instance = false;


		private function __construct(){

            add_action('init', array($this, 'program_custom_post_type'));
            add_action('init', array($this, 'program_cat_type'));
            add_action('init', array($this, 'program_cat_location'));
            add_filter("rest_prepare_cobh_program", array($this, 'cobh_rest_prepare_program'), 10, 3);
            // 3. Hide ACF field group menu item
            //add_filter('acf/settings/show_admin', '__return_false');

			//front end
			add_action( 'wp_enqueue_scripts', array( $this, 'register_plugin_scripts'));
			add_shortcode('cobh_program', array($this, 'cobh_program_shortcode'));
			add_action( 'wp_ajax_wsr_action', array($this, 'wsr_ajax_callback' ));
			add_action( 'wp_ajax_nopriv_wsr_action', array($this, 'wsr_ajax_callback' ));
		}



		// --------------------------------------------------------------------
		

		/**
		 * If an instance exists, this returns it.  If not, it creates one
		 */
		public static function getInstance() {
			if ( !self::$instance )
				self::$instance = new self;
			return self::$instance;
		}



		// --------------------------------------------------------------------


		/**
		 *  Register front end scripts for plugins
		 */
		function register_plugin_scripts(){
			if (!is_admin()){
				wp_enqueue_script('jquery');
				//change these to enqueue if not restricted to shortcode
				wp_register_style( 'cobh-program-css', plugins_url('cobh-program.css', __FILE__), array(), COBH_PROGRAM_VER, false);
				wp_register_script( 'cobh-program-js', plugins_url('js/dist/main.js', __FILE__), array(), COBH_PROGRAM_VER, true );
				//wp_enqueue_style( 'cobh-program-css');
				//wp_enqueue_script( 'cobh-program-js'); 
				//wp_localize_script('mv-plugin-js', 'cobh_program_ajax', array(	
				// 	"ajaxurl" => admin_url('admin-ajax.php'),
				// 	"ajax_nonce" => wp_create_nonce('security-nounce-here'),
				// 	"siteurl" => get_bloginfo('url'),
				// 	"path" => plugins_url('', __FILE__)
				// ));
			}
		}


		// --------------------------------------------------------------------
        

        function program_custom_post_type(){
        
            $labels = array(
                'name'	=> 'Programs',
                'singular_name'	=> 'Program',
                'add_new_item'	=> 'Add New Program',
                'edit_item'	=> 'Edit Program',
                'new_item'	=> 'New Program',
                'view_item'	=> 'View Program',
                'search_items'	=> 'Search Programs',
                'not_found'	=> 'No Programs found',
                'not_found_in_trash' => 'No Programs found in trash',
                'all_items' => 'All Programs',
                'archives' => 'Program Archives',
                'insert_into_item' => 'Insert into Program',
                'uploaded_to_this_item' => 'Upload into this Program'
            );
        
            register_post_type( 'cobh_program', array(
                'label'		=> 'Programs',
                'labels'	=> $labels,
                'description'	=> 'Program entries',
                'public'	=> true,
                'has_archive'	=> true,
                'show_ui' => true,
                'show_in_nav_menus'	=> true,
                'show_in_rest' => true,
                'menu_icon'	=> 'dashicons-admin-home',
                'taxonomies'	=> array('wsr_custom_tax'),
                'rewrite'	=> array('slug' => 'programs'),
                'supports'	=> array('title'),
            ));
        
            flush_rewrite_rules(true);
        }


        // --------------------------------------------------------------------
    

        function program_cat_type(){
                $taxonomy_object_types = array(
                    'cobh_program'
                );

                $taxonomy_args = array(
                    'show_ui' 		=> true,
                    'show_in_rest' => true,
                    'rest_base'    => 'program_types',
                    'show_admin_column' => true,
                    'hierarchical' 	=> true,
                    'label' 		=> 'Type',
                    'rewrite'	=> array('slug' => 'type')
                );

            register_taxonomy('cobh_program_type', $taxonomy_object_types, $taxonomy_args);
        }


        // --------------------------------------------------------------------
    

        function program_cat_location(){
            $taxonomy_object_types = array(
                'cobh_program'
            );

            $taxonomy_args = array(
                'show_ui' 		=> true,
                'show_in_rest' => true,
                'rest_base'    => 'program_locations',
                'show_admin_column' => true,
                'hierarchical' 	=> true,
                'label' 		=> 'Location',
                'rewrite'	=> array('slug' => 'location')
            );

            register_taxonomy('cobh_program_location', $taxonomy_object_types, $taxonomy_args);
        }


        // --------------------------------------------------------------------


		/**
		 * shortcode function
		 */
		function cobh_program_shortcode($atts){

			// $a = shortcode_atts( array(
		    //     'element' => '#cobh-program'
		    // ), $atts );


			wp_enqueue_style( 'cobh-program-css');
			wp_enqueue_script( 'cobh-program-js'); 
			// wp_localize_script('mv-plugin-js', 'cobh_program_ajax', array(	
			// 	"ajaxurl" => admin_url('admin-ajax.php'),
			// 	"ajax_nonce" => wp_create_nonce('security-nounce-here'),
			// 	"siteurl" => get_bloginfo('url'),
			// 	"path" => plugins_url('', __FILE__)
			// ));

			ob_start(); ?> 
			<?php include('cobh-program-view.php'); ?>
			<?php return ob_get_clean();
		}


		// --------------------------------------------------------------------


        function cobh_rest_prepare_program($data, $post, $request) {
            $_data = $data->data;
            
            $params = $request->get_params();
            //if single program, then get the custom fields
           // if ( isset( $params['id'] ) ) {
            $fields = get_fields($post->ID);
            foreach ($fields as $key => $value){
                $_data[$key] = get_field($key, $post->ID);
            }
            $data->data = $_data;
           // }
            
            return $data;
          }
	}
}


// Instantiate our class
$COBH_program = COBH_program::getInstance();

