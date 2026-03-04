// app.js
let scene, camera, renderer, player, bullets = [], enemies = [];
let playerSpeed = 0.2;
let mouseX = 0, mouseY = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // Create the player (cube)
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    scene.add(player);

    camera.position.z = 5;

    // Create a simple ground plane
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);

    // Handle keyboard inputs
    document.addEventListener('keydown', onKeyDown, false);

    // Mouse movement
    document.addEventListener('mousemove', onMouseMove, false);

    animate();
}

// Handle player movement
function onKeyDown(event) {
    switch(event.key) {
        case "w":
            player.position.z -= playerSpeed;
            break;
        case "s":
            player.position.z += playerSpeed;
            break;
        case "a":
            player.position.x -= playerSpeed;
            break;
        case "d":
            player.position.x += playerSpeed;
            break;
    }
}

// Update mouse position
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Create bullets
function shootBullet() {
    const bulletGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    bullet.position.set(player.position.x, player.position.y, player.position.z);
    bullets.push(bullet);
    scene.add(bullet);
}

// Create enemies (simple cubes for now)
function spawnEnemies() {
    const enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
    const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
    enemy.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
    enemies.push(enemy);
    scene.add(enemy);
}

// Update game state
function animate() {
    requestAnimationFrame(animate);

    // Update bullets (move them forward)
    bullets.forEach(bullet => {
        bullet.position.z -= 0.2;
    });

    // Simple enemy movement (random)
    enemies.forEach(enemy => {
        enemy.position.x += (Math.random() - 0.5) * 0.05;
        enemy.position.z += (Math.random() - 0.5) * 0.05;
    });

    // Render the scene
    renderer.render(scene, camera);
}

// Set up the game environment
init();
setInterval(spawnEnemies, 2000);  // Spawn enemies every 2 seconds

// Shooting key
document.addEventListener('click', shootBullet, false);
