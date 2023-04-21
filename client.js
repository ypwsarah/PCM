import * as THREE from 'three';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/controls/OrbitControls";
// import Stats from '/jsm/libs/stats.module.js';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/GLTFLoader";
// import MouseMeshInteraction from './three_mmi.js';
// import { CSS2DRenderer, CSS2DObject } from './jsm/renderers/CSS2DRenderer.js';

			// Our Javascript will go here.
			var raycaster = new THREE.Raycaster();
			var mouse = new THREE.Vector2();
			var selectedPiece = null;
			var animation_condition = false;
			var red_color = new THREE.Color( 0xff0000 );
			var counter = 0;

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
			

			const light = new THREE.SpotLight();
			light.position.set(0,0,0);
			scene.add(light);
			

			const renderer = createRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			// document.getElementById("Next").addEventListener("click", function(event){
			// 	camera.position.z = 5;
			// });

			      // Setup scene.
				  scene.background = new THREE.Color(0xcfbbb4);
				  scene.add(createLight());
				  scene.add(createLight2());
				  scene.add(createHemisphereLight());
			
				  function createLight() {
					const lightGeometry = new THREE.SphereGeometry(0.5,16,8);
			
					const lightMaterial = new THREE.MeshStandardMaterial({
					  emissive: 0xffffee,
					  emissiveIntensity: 1,
					  color: 0x000000,
					});
			
					const light = new THREE.PointLight(0xffffff, 1, 100);
			
					light.power = 1600;
					light.castShadow = false;
					light.shadow.mapSize.width = 512;
					light.shadow.mapSize.heigth = 512;
					light.shadow.radius = 1.5;
			
					// light.add(new THREE.Mesh(lightGeometry, lightMaterial));
					light.position.set(-3, 5, -3);
			
					return light;
				  }

				  function createLight2() {
					const lightGeometry = new THREE.SphereGeometry(0.5,16,8);
			
					const lightMaterial = new THREE.MeshStandardMaterial({
					  emissive: 0xffffee,
					  emissiveIntensity: 1,
					  color: 0x000000,
					});
			
					const light2 = new THREE.PointLight(0xffffff, 1, 20, 2);
			
					light2.power = 1600;
					light2.castShadow = false;
					light2.shadow.mapSize.width = 512;
					light2.shadow.mapSize.heigth = 512;
					light2.shadow.radius = 1.5;
			
					// light2.add(new THREE.Mesh(lightGeometry, lightMaterial));
					light2.position.set(-3, -5, -3);
			
					return light2;
				  }
				
				
			
				  function createHemisphereLight() {
					return new THREE.HemisphereLight(0x303f9f, 0x000000, 1);
				  }

			
			const loader = new GLTFLoader();

			function createCamera(){
				
			}


			function onMouseMove( event ) {

				// calculate pointer position in normalized device coordinates
				// (-1 to +1) for both components

				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}

			function onClick(event){
				raycaster.setFromCamera(mouse, camera);
				let intersects = raycaster.intersectObjects(scene.children);
				if (intersects.length > 0){
					intersects[0].object.material.color.set(0xff0000);
					counter ++;
					if (counter ==8){
						console.log('red');
						nextScene();
					}
					// console.log(counter);
					// intersects[0].object.material.opacity = 0;
					// intersects[0].object.a = true;
					animation_condition = true;
					return
				}
			}

			function nextScene(){
				// camera.position.z = 5;
				// camera.zoom = 2; 
				loadedModel.scene.rotation.y -= 0.005;
				// renderer.render( scene, camera );
			window.requestAnimationFrame(nextScene);
		
				gsap.to( camera, {
					duration: 2,
					zoom: 8,
				
					onUpdate: function () {
					
						camera.updateProjectionMatrix();
					
					}
				} );

				gsap.to( camera.position, {
					duration: 2,
					x: 0,
					y: 0,
					z: 5,
	
					onUpdate: function () {
					
						camera.updateProjectionMatrix();
					
					}
				} );
				
				gsap.to( controls.target, {
					duration: 2,
					x: 0,
					y: 0,
					z: 0,
					onUpdate: function () {
					
						controls.update();
					
					}
				} );
			}

			function createRenderer(){
				const renderer = new THREE.WebGLRenderer({alpha:true});
				renderer.physicallyCorrectLights = true;
				renderer.gammaInput = true;
				renderer.gammaOutput = true;
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.bias = 0.0001;
				renderer.shadowMap.type = THREE.PCFSoftShadowMap;
				// renderer.setSize(window.innerWidth, window.innerHeight);

				return renderer;
			}

			//butterfly
			let mixer;
			loader.load('b.glb', function ( gltf ) {
			scene.add(gltf.scene );
			mixer = new THREE.AnimationMixer(gltf.scene);
			const clips = gltf.animations;
			// const clip = THREE.AnimationClip.findByName(clips,'Armature.001Action');
			// const action = mixer.clipAction(clip);
			// action.play();
			clips.forEach(function(clip){
				const action = mixer.clipAction(clip);
				action.play();
			});
			gltf.animations;
			gltf.scene;
			gltf.scenes;
			gltf.cameras;
			gltf.asset

			gltf.scene.position.z = 0.3;
			gltf.scene.position.x = -0.4;
			gltf.scene.position.y = -0.5;

}, undefined, function ( error ) {

			console.error( error );
} );

			//book
			let mixer2;
			loader.load('Book.glb', function ( gltf ) {
			scene.add(gltf.scene );
			mixer2 = new THREE.AnimationMixer(gltf.scene);
			const clips = gltf.animations;
			// const clip = THREE.AnimationClip.findByName(clips,'Armature.001Action');
			// const action = mixer.clipAction(clip);
			// action.play();
			clips.forEach(function(clip){
				const action = mixer2.clipAction(clip);
				action.play();
			});
			gltf.animations;
			gltf.scene;
			gltf.scenes;
			gltf.cameras;
			gltf.asset
			
			gltf.scene.position.x = -3;
			gltf.scene.position.z = 2;
			gltf.scene.scale.set(1/8,1/8,1/8);
}, undefined, function ( error ) {

			console.error( error );
} );

			//snowflake
			let loadedModel;
			loader.load('s.glb', function ( gltf ) {
				loadedModel = gltf;
				scene.add(gltf.scene );

				gltf.animations;
				gltf.scene;
				gltf.scenes;
				gltf.cameras;
				gltf.asset;
				// loadedModel.material.opacity = 1.0;

				gltf.scene.rotation.x = Math.PI/2;
				gltf.scene.scale.set(1/3,1/3,1/3);

			}, undefined, function ( error ) {

				console.error( error );

			} );

						//protest
						let mixer3;
						loader.load('protest.glb', function ( gltf ) {
						scene.add(gltf.scene );
						mixer3 = new THREE.AnimationMixer(gltf.scene);
						const clips = gltf.animations;
						// const clip = THREE.AnimationClip.findByName(clips,'Armature.001Action');
						// const action = mixer.clipAction(clip);
						// action.play();
						clips.forEach(function(clip){
							const action = mixer3.clipAction(clip);
							action.play();
						});
						gltf.animations;
						gltf.scene;
						gltf.scenes;
						gltf.cameras;
						gltf.asset
						
						gltf.scene.rotation.y = Math.PI;
						gltf.scene.position.y = 0.2;
						gltf.scene.position.x = 3;
						gltf.scene.position.z = 2;
						gltf.scene.scale.set(1/8,1/8,1/8);
			}, undefined, function ( error ) {
			
						console.error( error );
			} );

			//megaphone
			let loadedModel2;
			loader.load('megaphone.glb', function ( gltf ) {
				loadedModel2 = gltf;
				scene.add(gltf.scene );

				gltf.animations;
				gltf.scene;
				gltf.scenes;
				gltf.cameras;
				gltf.asset

				gltf.scene.rotation.y = Math.PI/4;
				gltf.scene.position.x = 3;
				gltf.scene.position.z = -2;
				gltf.scene.position.y = -0.2;
				gltf.scene.scale.set(1/8,1/8,1/8);

			}, undefined, function ( error ) {

				console.error( error );

			} );

			const controls = new OrbitControls( camera, renderer.domElement );

			const geometry = new THREE.SphereGeometry( 0.5, 16, 8 );
			const material = new THREE.MeshBasicMaterial( { color: 0xcfbbb4, transparent: true } );
			var sphere = new THREE.Mesh( geometry, material );
			// sphere.name = 'bubble';
			// sphere.material.opacity = 0.5;
			sphere.position.set(3,0,2);
			scene.add( sphere );

			// const geometry = new THREE.SphereGeometry( 0.5, 16, 8 );
			const material2 = new THREE.MeshBasicMaterial( { color: 0xcfbbb4, transparent: true } );
			var sphere2 = new THREE.Mesh( geometry, material2 );
			// sphere.name = 'bubble';
			// sphere.material.opacity = 0.5;
			sphere2.position.set(3,0,-2);
			scene.add( sphere2 );

			const material3 = new THREE.MeshBasicMaterial( { color: 0xcfbbb4, transparent: true } );
			var sphere3 = new THREE.Mesh( geometry, material3 );
			// sphere.name = 'bubble';
			// sphere.material.opacity = 0.5;
			sphere3.position.set(-3,0,2);
			scene.add( sphere3 );

			const material4 = new THREE.MeshBasicMaterial( { color: 0xcfbbb4, transparent: true } );
			var sphere4 = new THREE.Mesh( geometry, material4 );
			// sphere.name = 'bubble';
			// sphere.material.opacity = 0.5;
			sphere4.position.set(-3,0,-2);
			scene.add( sphere4 );
	
			

			camera.position.z = 5;

			// const mmi = new MouseMeshInteraction(scene, camera);
			// mmi.addHandler('bubble','click',function(mesh){
			// 	// console.log("bubble has been clicked!");
			// 	if(mesh.material.color == 0xcfbbb4){
			// 		mesh.material.color = 0x9b4c46;
			// 	}
			// 	else{
			// 		mesh.material.color = yellow_color;
			// 	}
			// });

			function resetMaterials(){
				for(let i=0; i<scene.children.length; i++){
					if(scene.children[i].material){
						scene.children[i].material.opacity = 1.0;
					}
				}
			}
			function hoverPiece(){
				raycaster.setFromCamera(mouse, camera);
				const intersects = raycaster.intersectObjects(scene.children);
				for(let i=0;i<intersects.length;i++){
					// intersects[i].object.material.transparent = true;
					intersects[i].object.material.opacity = 0.5;
				}
			}


			const clock = new THREE.Clock();
			const clock2 = new THREE.Clock();
			const clock3 = new THREE.Clock();

			function animate() {
			if(mixer)
				mixer.update(clock.getDelta());

			if(mixer2)
				mixer2.update(clock2.getDelta());

			if(mixer3)
				mixer3.update(clock3.getDelta());
		
			// cube.rotation.x += 0.01;
			// cube.rotation.y += 0.01;
			if(animation_condition == true && counter<8){
				loadedModel.scene.rotation.y -= 0.05;
			}
			else{
			}
			
			window.addEventListener( 'mousemove', onMouseMove, false );
			window.addEventListener('click', onClick);
			resetMaterials();
			hoverPiece();
			renderer.render( scene, camera );
			window.requestAnimationFrame(animate);

			
};
// renderer.setAnimationLoop(animate);
animate();

