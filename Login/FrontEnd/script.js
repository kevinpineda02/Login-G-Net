// Eventos para alternar entre formularios
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.logueo');
    const registroForm = document.querySelector('.registro');
    const verificarForm = document.querySelector('.verificar');
    
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const resendCodeBtn = document.getElementById('resendCode');

    // Función para mostrar mensajes personalizados
    function showMessage(message) {
        document.getElementById('messageText').textContent = message;
        document.getElementById('messageModal').classList.add('show');
    }

    // Función para animar el cambio de formularios
    function switchForm(hideForm, showForm) {
        hideForm.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        setTimeout(() => {
            hideForm.style.display = 'none';
            showForm.style.display = 'block';
            showForm.style.animation = 'scaleIn 0.5s ease-out forwards';
            
            // Mostrar/ocultar el botón de cerrar
            const closeBtn = document.getElementById('backToRegister');
            if (showForm === verificarForm) {
                closeBtn.style.display = 'block';
            } else {
                closeBtn.style.display = 'none';
            }
        }, 300);
    }

    // Mostrar formulario de registro
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchForm(loginForm, registroForm);
        });
    }

    // Mostrar formulario de login
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchForm(registroForm, loginForm);
        });
    }

    // Funcionalidad para el formulario de login
    const loginFormElement = loginForm.querySelector('form');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = loginFormElement.querySelector('input[name="email"]').value.trim();
            const password = loginFormElement.querySelector('input[name="password"]').value;
            
            if (!email || !password) {
                showMessage('Por favor completa todos los campos');
                return;
            }
            
            // Validar formato de email UFG
            if (!email.endsWith('@ufg.edu.sv')) {
                showMessage('Debes usar tu correo institucional (@ufg.edu.sv)');
                return;
            }
            
            // Simular proceso de login
            showMessage('Iniciando sesión...');
            setTimeout(() => {
                window.location.replace('../../Home/index.html');
            }, 1000);
        });
    }

    // Funcionalidad para el formulario de registro
    const registroFormElement = registroForm.querySelector('form');
    if (registroFormElement) {
        const submitBtn = registroFormElement.querySelector('.btn-primary');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Validar campos
                const nombre = registroFormElement.querySelector('input[name="nombre"]').value.trim();
                const email = registroFormElement.querySelector('input[name="email"]').value.trim();
                const password = registroFormElement.querySelector('input[name="password"]').value;
                const confirmPassword = registroFormElement.querySelector('input[name="confirmPassword"]').value;
                
                if (!nombre || !email || !password || !confirmPassword) {
                    showMessage('Por favor completa todos los campos');
                    return;
                }
                
                if (!email.endsWith('@ufg.edu.sv')) {
                    showMessage('El correo debe ser del dominio @ufg.edu.sv');
                    return;
                }
                
                if (password !== confirmPassword) {
                    showMessage('Las contraseñas no coinciden');
                    return;
                }
                
                // Animación de carga en el botón
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Registrando...';
                submitBtn.style.opacity = '0.7';
                
                // Simular proceso de registro
                switchForm(registroForm, verificarForm);
                
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
            });
        }
    }

    // Funcionalidad para reenviar código
    if (resendCodeBtn) {
        resendCodeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('resendModal').classList.add('show');
        });
    }

    // Funcionalidad de la modal
    const resendModal = document.getElementById('resendModal');
    const modalClose = document.querySelector('.modal-close');
    const cancelResend = document.getElementById('cancelResend');
    const confirmResend = document.getElementById('confirmResend');

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            resendModal.classList.remove('show');
        });
    }

    if (cancelResend) {
        cancelResend.addEventListener('click', function() {
            resendModal.classList.remove('show');
        });
    }

    if (confirmResend) {
        confirmResend.addEventListener('click', function() {
            showMessage('Código reenviado a tu correo electrónico');
            resendModal.classList.remove('show');
        });
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === resendModal) {
            resendModal.classList.remove('show');
        }
        if (event.target === messageModal) {
            messageModal.classList.remove('show');
        }
    });

    // Event listeners para la modal de mensajes
    const messageModal = document.getElementById('messageModal');
    const messageClose = messageModal.querySelector('.modal-close');
    const messageOk = document.getElementById('messageOk');

    if (messageClose) {
        messageClose.addEventListener('click', function() {
            messageModal.classList.remove('show');
        });
    }

    if (messageOk) {
        messageOk.addEventListener('click', function() {
            messageModal.classList.remove('show');
        });
    }

    // Botón para volver al registro desde verificación
    const backToRegisterBtn = document.getElementById('backToRegister');
    if (backToRegisterBtn) {
        backToRegisterBtn.addEventListener('click', function() {
            switchForm(verificarForm, registroForm);
        });
    }

    // Funcionalidad para el formulario de verificación
    const verificarFormElement = verificarForm.querySelector('form');
    if (verificarFormElement) {
        verificarFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const codigoInputs = document.querySelectorAll('.codigo-input');
            const codigo = Array.from(codigoInputs).map(input => input.value).join('');
            
            if (codigo.length === 0) {
                showMessage('Por favor ingresa el código de verificación');
                return;
            }
            
            if (codigo.length < 6) {
                showMessage('El código debe tener 6 dígitos');
                return;
            }
            
            if (codigo.length === 6) {
                showMessage('Cuenta verificada exitosamente');
                // Redirigir al usuario a la página principal
                setTimeout(() => {
                    window.location.replace('../../Home/index.html');
                }, 1000);
            }
        });
    }

    // Auto-formateo para los inputs de código
    const codigoInputs = document.querySelectorAll('.codigo-input');
    codigoInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // Solo permitir números
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Pasar al siguiente input si se ingresa un dígito
            if (this.value.length === 1 && index < 5) {
                codigoInputs[index + 1].focus();
            }
        });
        
        // Permitir borrar y volver al anterior
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                codigoInputs[index - 1].focus();
            }
        });
    });
});
