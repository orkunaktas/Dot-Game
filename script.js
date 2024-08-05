        const numberOfDots = 30; 
        const maxSpeed = 10;
        const escapeSpeed = 13; 
        const dotSize = 20; 
        const distanceToEscape = 150; 

        const dots = [];

        function createDot() {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.left = `${Math.random() * (window.innerWidth - dotSize)}px`;
            dot.style.top = `${Math.random() * (window.innerHeight - dotSize)}px`;
            dot.speedX = (Math.random() - 0.5) * maxSpeed;
            dot.speedY = (Math.random() - 0.5) * maxSpeed;
            document.body.appendChild(dot);
            return dot;
        }

        function moveDots() {
            dots.forEach(dot => {
                const rect = dot.getBoundingClientRect();
                let newX = parseFloat(dot.style.left) + dot.speedX;
                let newY = parseFloat(dot.style.top) + dot.speedY;

                if (newX < 0 || newX > window.innerWidth - dotSize) dot.speedX = -dot.speedX;
                if (newY < 0 || newY > window.innerHeight - dotSize) dot.speedY = -dot.speedY;

                dot.style.left = `${newX}px`;
                dot.style.top = `${newY}px`;
            });

            requestAnimationFrame(moveDots);
        }

        function updateDotPosition(event) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            dots.forEach(dot => {
                const dotRect = dot.getBoundingClientRect();
                const dotX = dotRect.left + dotRect.width / 2;
                const dotY = dotRect.top + dotRect.height / 2;
                const distance = Math.sqrt((dotX - mouseX) ** 2 + (dotY - mouseY) ** 2);

                if (distance < distanceToEscape) {
                    const angle = Math.atan2(dotY - mouseY, dotX - mouseX);
                    const moveX = Math.cos(angle) * escapeSpeed;
                    const moveY = Math.sin(angle) * escapeSpeed;

                    dot.style.left = `${parseFloat(dot.style.left) + moveX}px`;
                    dot.style.top = `${parseFloat(dot.style.top) + moveY}px`;

                    dot.classList.add('near');
                } else {
                    dot.classList.remove('near');
                }
            });
        }

        for (let i = 0; i < numberOfDots; i++) {
            dots.push(createDot());
        }

        moveDots();
        document.addEventListener('mousemove', updateDotPosition);
