// Mega menu, para que se desplaze al pasar el mause //

document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");

  dropdown.addEventListener("mouseenter", function () {
    const menu = this.querySelector(".mega-menu");
    if (menu) {
      menu.style.display = "block";
    }
  });

  dropdown.addEventListener("mouseleave", function () {
    const menu = this.querySelector(".mega-menu");
    if (menu) {
      menu.style.display = "none";
    }
  });
});

// Efecto de escritura para las letras //
$(function () {
  $("#animated-text h1").hide().fadeIn(2000).animate({ fontSize: "5rem" }, 1000);
});

$(function () {
  const text = "Activate GYM";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      $("#animated-text h1").append(text[index]);
      index++;
      setTimeout(typeEffect, 100); // Velocidad de escritura (100ms por letra)
        }
  }

  $("#animated-text h1").text(""); // Limpia el texto inicial
  typeEffect(); // Inicia el efecto de escritura
});

 // Formulario de contacto (sipinner) //
function mostrarSpinner(event) {
  event.preventDefault();

  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");

  setTimeout(() => {
    spinner.classList.add("d-none");
    const modal = new bootstrap.Modal(document.getElementById("modal"));
    modal.show();
  }, 2000);
}

function cerrarModal() {
  const modalElement = document.getElementById("modal");
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}

// Animacion del logo //
$(function () {
  $(".logo-rotativo").on("click", function () {
    $(this).toggleClass("pause-rotate");
  });
});

// Efcto para las tarjetas //
$(".card").hover(
  function () {
    $(this).animate({ marginTop: "-10px" }, 200);
  },
  function () {
    $(this).animate({ marginTop: "0px" }, 200);
  }
);

// Contador animado //
$(function () {
  const $counter = $(".numero");
  const baseCount = 500; // Número base del contador
  const randomIncrement = Math.floor(Math.random() * 50) + 1; // Incremento aleatorio entre 1 y 50
  const finalCount = baseCount + randomIncrement;
  let currentCount = baseCount;

  function animateCounter() {
    const interval = setInterval(() => {
      if (currentCount < finalCount) {
        currentCount++;
        $counter.text(currentCount + "+");
      } else {
        clearInterval(interval); // Detiene la animación cuando alcanza el valor final
      }
    }, 50); // Velocidad de incremento (50ms)
  }

  $(window).on("scroll", function () {
    const counterOffset = $counter.offset().top;
    const scrollPosition = $(window).scrollTop() + $(window).height();

    if (scrollPosition > counterOffset) {
      animateCounter(); // Inicia el contador al hacer scroll
      $(window).off("scroll"); // Evita que se reinicie al seguir haciendo scroll
    }
  });
});


// ------------------ PAGINA DE CLASES ------------------//

// Filtros por categoría //
$(function () {
    $(".filter-radio").on("change", function () {
        const selectedCategory = $(".filter-radio:checked").val();
        
        if (selectedCategory === "all") {
            $(".class-item").show(); // Muestra todas las clases si se selecciona "Todos"
        } else {
            $(".class-item").hide(); // Oculta todas las clases
            $(`.${selectedCategory}`).show(); // Muestra las clases que coincidan con la categoría seleccionada
        }
    });
});


//------------------ PAGINA DE ENTRENADORES ------------------ //

 // Barra animada //
 $(document).ready(function () {
  function animateBars() {
    $('.progress-bar').each(function () {
      let randomWidth = Math.floor(Math.random() * 51) + 50; // entre 50% y 100%
      $(this).css('width', randomWidth + '%');
    });
  }

  // Animación cada 3 segundos
  setInterval(animateBars, 3000);
});

//------------------ PAGINA DE CONTACTO ------------------ //

$(document).ready(function () {
  const $form = $('#formContacto');
  const $spinner = $('#spinnerContacto');
  const $btnEnviar = $('#btnEnviarContacto');

  // Validación en tiempo real
  $form.on('input', 'input, textarea', function () {
    const campo = this;
    if (campo.checkValidity()) {
      $(campo).removeClass('is-invalid').addClass('is-valid');
    } else {
      $(campo).removeClass('is-valid').addClass('is-invalid');
    }
  });

  // Enviar formulario
  $form.on('submit', function (e) {
    e.preventDefault();

    if (this.checkValidity()) {
      $spinner.removeClass('d-none').hide().fadeIn();
      $btnEnviar.prop('disabled', true);

      setTimeout(() => {
        $spinner.fadeOut(() => $spinner.addClass('d-none'));
        $btnEnviar.prop('disabled', false);
        $('#modalConfirmacionContacto').modal('show');
        $form[0].reset();
        $form.find('.form-control').removeClass('is-valid');
      }, 1500);
    } else {
      $form.find(':input').each(function () {
        if (!this.checkValidity()) {
          $(this).addClass('is-invalid');
        }
      });
    }
  });
});

//------------------ PAGINA DE PRECIOS ------------------ //

  $(document).ready(function () {
    $('#togglePlanPersonalizado').on('change', function () {
      const anual = $(this).is(':checked');
      $('.precio-personalizado').each(function () {
        const nuevo = anual ? $(this).data('anual') : $(this).data('mensual');
        $(this).text(`$${nuevo}`);
      });
    });
 });

//------------------ PAGINA DE BLOG ------------------ //

$(document).ready(function() {
  // Inicializar AOS //
  AOS.init({ once: true });

  // Filtros por tags //
  $('.btn-tag').on('click', function() {
    const tag = $(this).data('tag');
    if(tag === 'all') {
      $('.articulo').show();
    } else {
      $('.articulo').hide().filter(function() {
        return $(this).data('tags').split(' ').includes(tag);
      }).show();
    }
  });

  // Agregar comentario dinámico con contenido real //
  $('#btnAgregarComentario').on('click', function() {
    const comentarioTexto = $('#inputComentario').val().trim(); // Obtiene el texto del campo de entrada
    if (comentarioTexto) {
      const nuevoComentario = `
<div class="comentario" data-aos="fade-in">
<p><strong>Usuario:</strong> ${comentarioTexto}</p>
</div>
      `;
    $('#listaComentarios').append(nuevoComentario); // Añade el comentario a la lista
      $('#inputComentario').val(''); // Limpia el campo de entrada
      AOS.refresh(); // Refresca las animaciones
    } else {
      alert('Por favor, escribe un comentario antes de enviarlo.');
    }
  });
});  