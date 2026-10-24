// ================================================
// 3D МОДЕЛЬ ЧАШКИ КОФЕ - PNG РЕНДЕРИНГ С 3D ЭФФЕКТОМ
// ================================================

export function initCoffee3D() {
    const container = document.getElementById('coffee-3d-container');
    if (!container) return;
    
    // Очищаем контейнер
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Создаем 3D-подобную анимацию для PNG изображения
    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        perspective: 1200px;
    `;
    
    // Создаем элемент изображения
    const img = document.createElement('img');
    img.src = 'coffee-cup.png';
    img.alt = 'Чашка кофе CoffeeDelice';
    img.style.cssText = `
        width: 80%;
        max-width: 320px;
        height: auto;
        object-fit: contain;
        filter: drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15));
        transition: transform 0.3s ease, filter 0.3s ease;
        animation: coffeeFloat 3s ease-in-out infinite;
        border-radius: 20px;
    `;
    
    // Добавляем CSS анимацию для парящего эффекта
    const style = document.createElement('style');
    style.textContent = `
        @keyframes coffeeFloat {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-15px) rotate(2deg);
            }
        }
        
        @keyframes coffeeGlow {
            0%, 100% {
                filter: drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) brightness(1);
            }
            50% {
                filter: drop-shadow(0 25px 35px rgba(255, 152, 0, 0.2)) brightness(1.02);
            }
        }
        
        .coffee-3d-container .coffee-img-3d {
            animation: coffeeFloat 3s ease-in-out infinite, coffeeGlow 4s ease-in-out infinite;
            transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            cursor: pointer;
        }
        
        .coffee-3d-container .coffee-img-3d:hover {
            transform: scale(1.02) translateY(-5px);
            filter: drop-shadow(0 30px 40px rgba(255, 152, 0, 0.25));
        }
        
        @keyframes steamAnimation {
            0% {
                transform: translateY(0px) scale(0.9);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px) scale(1.1);
                opacity: 0.6;
            }
            100% {
                transform: translateY(-40px) scale(1.3);
                opacity: 0;
            }
        }
        
        .coffee-steam-effect {
            position: absolute;
            bottom: 60%;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 80px;
            pointer-events: none;
            z-index: 5;
        }
        
        .steam-particle {
            position: absolute;
            bottom: 0;
            left: 50%;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            filter: blur(8px);
            animation: steamAnimation 3s ease-out infinite;
        }
        
        .steam-particle:nth-child(1) {
            width: 30px;
            height: 30px;
            animation-delay: 0s;
            left: 45%;
        }
        .steam-particle:nth-child(2) {
            width: 40px;
            height: 40px;
            animation-delay: 0.5s;
            left: 50%;
        }
        .steam-particle:nth-child(3) {
            width: 25px;
            height: 25px;
            animation-delay: 1s;
            left: 55%;
        }
        .steam-particle:nth-child(4) {
            width: 35px;
            height: 35px;
            animation-delay: 1.5s;
            left: 48%;
        }
        .steam-particle:nth-child(5) {
            width: 20px;
            height: 20px;
            animation-delay: 2s;
            left: 52%;
        }
        
        /* Эффект пара при наведении */
        .coffee-3d-container:hover .steam-particle {
            animation-duration: 2s;
        }
        
        /* Блик на изображении */
        .coffee-img-3d {
            position: relative;
        }
    `;
    
    document.head.appendChild(style);
    
    img.className = 'coffee-img-3d';
    
    // Добавляем эффект пара
    const steamDiv = document.createElement('div');
    steamDiv.className = 'coffee-steam-effect';
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'steam-particle';
        steamDiv.appendChild(particle);
    }
    
    imgContainer.appendChild(steamDiv);
    imgContainer.appendChild(img);
    container.appendChild(imgContainer);
    
    // 3D эффект при движении мыши (параллакс)
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        const rotateY = x * 15;
        const rotateX = -y * 10;
        
        img.style.transform = `translateY(-5px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        img.style.transition = 'transform 0.1s ease';
    });
    
    container.addEventListener('mouseleave', () => {
        img.style.transform = 'translateY(0px) rotateY(0deg) rotateX(0deg)';
        img.style.transition = 'transform 0.5s ease';
    });
    
    // Добавляем затемнение для оверлея (опционально)
    const overlay = container.querySelector('.coffee-3d-overlay');
    if (overlay) {
        overlay.style.zIndex = '15';
        overlay.style.pointerEvents = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCoffee3D();
});