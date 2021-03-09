<?php 
/*
Plugin Name: COBH Program Finder
Plugin URI: http://websector.com.au
Description: 
Version: 1.2.1
Author: WSR
Author URI: http://websector.com.au
License: A short license name. Example: GPL2
	Helpers:
	File system path to plugin:  plugin_dir_path(__FILE__);
	URL to plugin:  plugins_url(__FILE__)
*/


defined( 'ABSPATH' ) or die( 'No script kiddies please!' );


if( !defined( 'COBH_PROGRAM_VER' ) )
	define( 'COBH_PROGRAM_VER', '1.2.1' );



// 4. Include ACF
include_once( plugin_dir_path(__FILE__) . '/acf/acf.php' );
include_once( plugin_dir_path(__FILE__) . 'cobh-acf-fields.php');


// Start up the engine
if ( !class_exists( 'COBH_program' ) ) {
class COBH_program{


		static $instance = false;


		private function __construct(){

            add_action('init', array($this, 'program_custom_post_type'));
            add_action('init', array($this, 'program_cat_resource_type'));
            add_action('init', array($this, 'program_cat_service_type'));
            add_action('init', array($this, 'program_cat_location'));
            add_action('init', array($this, 'program_cat_age'));

            add_filter("rest_prepare_cobh_program", array($this, 'cobh_rest_prepare_program'), 10, 3);
            // 3. Hide ACF field group menu item
            //add_filter('acf/settings/show_admin', '__return_false');

			//front end
			add_action( 'wp_enqueue_scripts', array( $this, 'register_plugin_scripts'));
			add_shortcode('cobh_program', array($this, 'cobh_program_shortcode'));
			//add_action( 'wp_ajax_wsr_action', array($this, 'wsr_ajax_callback' ));
			//add_action( 'wp_ajax_nopriv_wsr_action', array($this, 'wsr_ajax_callback' ));
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
				wp_register_script( 'cobh-program-js', plugins_url('js/dist/main.js', __FILE__), array(), '1.4', true );
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
                'supports'	=> array('title', 'editor', 'thumbnail'),
            ));
        
            flush_rewrite_rules(true);
        }


        // --------------------------------------------------------------------
    

        function program_cat_service_type(){
                $taxonomy_object_types = array(
                    'cobh_program'
                );

                $taxonomy_args = array(
                    'show_ui' 		=> true,
                    'show_in_rest' => true,
                    'rest_base'    => 'program_types',
                    'show_admin_column' => true,
                    'hierarchical' 	=> true,
                    'label' 		=> 'Service Type',
                    'rewrite'	=> array('slug' => 'type')
                );

            register_taxonomy('cobh_program_type', $taxonomy_object_types, $taxonomy_args);
        }


        function program_cat_resource_type(){
            $taxonomy_object_types = array(
                'cobh_program'
            );

            $taxonomy_args = array(
                'show_ui' 		=> true,
                'show_in_rest' => true,
                'rest_base'    => 'resource_types',
                'show_admin_column' => true,
                'hierarchical' 	=> true,
                'label' 		=> 'Resource Type',
                'rewrite'	=> array('slug' => 'resource')
            );

        register_taxonomy('cobh_program_resource_type', $taxonomy_object_types, $taxonomy_args);
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


        function program_cat_age(){
            $taxonomy_object_types = array(
                'cobh_program'
            );

            $taxonomy_args = array(
                'show_ui' 		=> true,
                'show_in_rest' => true,
                'rest_base'    => 'program_age',
                'show_admin_column' => true,
                'hierarchical' 	=> true,
                'label' 		=> 'Age',
                'rewrite'	=> array('slug' => 'age')
            );

            register_taxonomy('cobh_program_age', $taxonomy_object_types, $taxonomy_args);
        }
        

        // --------------------------------------------------------------------


		/**
		 * shortcode function
		 */
		function cobh_program_shortcode($atts){
            wp_enqueue_style( 'cobh-program-css');
            wp_enqueue_script( 'cobh-program-js');
            
            //get first resource type as default
            $resource_type_terms = get_terms( array(
                'taxonomy' => 'cobh_program_resource_type'
            ) );
             
            //display: program or resource
			$a = shortcode_atts( array(
		        'resource_type' => $resource_type_terms[0]->term_id
		    ), $atts );
            

            $service_types = [];
            $service_type_terms = get_terms( array(
                'taxonomy' => 'cobh_program_type',
                'orderby' => 'term_id'
            ) );

            $serviceCount = 0;
            foreach($service_type_terms as $term){
                $terms['id'] = $term->term_id;
                $terms['name'] = $term->name;
                $image_id = get_field('service_image', 'cobh_program_type_' . $term->term_id);
                $terms['image'] = wp_get_attachment_image_url($image_id['id'], 'thumbnail');
                $terms['color'] = get_field('service_colour', 'cobh_program_type_' . $term->term_id);
                array_push($service_types, $terms);
                $serviceCount++;
            }

            $serviceColumns = 100 / $serviceCount;
            $custom_css = "
                #cobh-types ul li{
                    background-image: none;
                    width: {$serviceColumns}%
                }";

            wp_add_inline_style( 'cobh-program-css', $custom_css );
            
            $programs = [];
            $program_posts = get_posts($args = array(
                'numberposts' => 100,
                'post_type'   => 'cobh_program'
            ));

            foreach ( $program_posts as $post ) {
                $posts['id'] = $post->ID;
                $posts['title'] = $post->post_title;
                $posts['content'] = $post->post_content;
                $posts['funding'] = get_field('funding', $post->ID);
                $posts['who_is_it_for'] = get_field('who_is_it_for', $post->ID);
                $posts['how_to_refer'] = get_field('how_to_refer', $post->ID);
                $posts['therapy__service_offered'] = get_field('therapy__service_offered', $post->ID);
                $posts['supervisor'] = get_field('supervisor', $post->ID);
                $posts['assistant_manager'] = get_field('assistant_manager', $post->ID);
                $posts['locations_available'] = get_field('locations_available', $post->ID);
                $posts['color'] = get_field('color', $post->ID);
                $posts['doc_1'] = get_field('doc_1', $post->ID);
                $posts['doc_2'] = get_field('doc_2', $post->ID);
                $posts['pdf_link'] = get_field('pdf_link', $post->ID);
                $posts['cobh_brochure'] = get_field('cobh_brochure', $post->ID);
                $posts['thumbnail'] = get_the_post_thumbnail_url($post->ID, 'thumbnail');
                if ($posts['thumbnail']){
                    $here = '';
                }
                $posts['program_types'] = [];
                $typeTerms = wp_get_post_terms( $post->ID, 'cobh_program_type', array() );
                foreach ( $typeTerms as $types ) {
                    array_push($posts['program_types'], $types->term_id);
                }

                $posts['resource_types'] = [];
                $resourcesTerms = wp_get_post_terms( $post->ID, 'cobh_program_resource_type', array() );
                foreach ( $resourcesTerms as $resource ) {
                    array_push($posts['resource_types'], $resource->term_id);
                }

                $posts['program_locations'] = [];
                $locationTerms = wp_get_post_terms( $post->ID, 'cobh_program_location', array() );
                foreach ( $locationTerms as $location ) {
                    array_push($posts['program_locations'], $location->term_id);
                }

                $posts['program_age'] = [];
                $ageTerms = wp_get_post_terms( $post->ID, 'cobh_program_age', array() );
                foreach ( $ageTerms as $age ) {
                    array_push($posts['program_age'], $age->term_id);
                }

                array_push($programs, $posts);
            }

            
            
			ob_start(); ?> 
            <script> var cobh_resource_type = <?php echo $a['resource_type']; ?> </script>
            <script>var cobh_service_types = <?php echo json_encode($service_types)?> </script>
            <script> var cobh_programs = <?php echo json_encode($programs)?> </script>
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

