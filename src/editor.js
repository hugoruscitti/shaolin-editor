var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var g = {
    imagenes: undefined
};

var Imagenes = (function () {
    function Imagenes(callback_onready, data_path) {
        this.recursos = {};
        this.data_path = data_path;
        this.loader = new PxLoader();
        this.imagenes_solicitadas = 0;

        this.cargar_recursos();

        this.loader.addCompletionListener(function (e) {
            callback_onready();
        });

        this.loader.start();
    }
    Imagenes.prototype.cargar_recursos = function () {
        this.cargar_recurso('aceituna.png');
        this.cargar_recurso('caja.png');
    };

    Imagenes.prototype.cargar_recurso = function (nombre) {
        var path = this.data_path + '/' + nombre;
        this.recursos[nombre] = this.loader.addImage(path);
        this.imagenes_solicitadas += 1;
    };

    Imagenes.prototype.cargar = function (nombre) {
        if (nombre in this.recursos)
            return new Imagen(this.recursos[nombre]);
else
            throw "No se puede encontrar la imagen: " + nombre + " ¿ha sido pre-cargada?";
    };
    return Imagenes;
})();

var Imagen = (function () {
    function Imagen(imagen) {
        this.ruta = imagen;
        this.imagen = imagen;
    }
    Imagen.prototype.instanciar = function () {
        return new createjs.Bitmap(this.imagen);
    };

    Object.defineProperty(Imagen.prototype, "ancho", {
        get: function () {
            return this.imagen.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Imagen.prototype, "alto", {
        get: function () {
            return this.imagen.height;
        },
        enumerable: true,
        configurable: true
    });
    return Imagen;
})();

var EditorActor = (function () {
    function EditorActor(imagen, x, y) {
        this.nombre_imagen = imagen;
        var img = (g.imagenes).cargar(imagen);
        this.sprite = img.instanciar();
        this.x = x;
        this.y = y;
        this.escala = 1;
        this.rotacion = 0;
        this.transparencia = 0;
        this.flip = false;
        this.centrar_punto_de_control();
    }
    EditorActor.prototype.centrar_punto_de_control = function () {
        this.sprite.regX = this.sprite.image.width / 2;
        this.sprite.regY = this.sprite.image.height / 2;
    };

    EditorActor.prototype.actualizar = function () {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.rotation = this.rotacion;

        if (this.flip)
            this.sprite.scaleX = this.escala * -1;
else
            this.sprite.scaleX = this.escala;

        this.sprite.scaleY = this.escala;
        this.sprite.alpha = 1 - (this.transparencia / 100);
    };

    EditorActor.prototype.obtener_datos_como_json = function () {
        return {
            x: this.x,
            y: this.y,
            escala: this.escala,
            rotacion: this.rotacion,
            transparencia: this.transparencia,
            nombre_imagen: this.nombre_imagen,
            flip: this.flip
        };
    };

    EditorActor.prototype.clonar = function () {
        var nuevo_actor = new EditorActor(this.nombre_imagen, this.x, this.y);
        nuevo_actor.escala = this.escala;
        nuevo_actor.transparencia = this.transparencia;
        nuevo_actor.rotacion = this.rotacion;
        return nuevo_actor;
    };

    EditorActor.prototype.alternar_flip = function () {
        this.flip = (!this.flip);
    };
    return EditorActor;
})();

var EditorTexto = (function () {
    function EditorTexto() {
        this.sprite = new createjs.Text("1 - modo cursor", "16px Arial", "white");
        this.sprite.x = 0;
        this.sprite.y = 0;
        //this.sprite.textBaseline = "alphabetic";
    }
    EditorTexto.prototype.definir_texto = function (texto_nuevo) {
        this.sprite.text = texto_nuevo;
    };

    EditorTexto.prototype.actualizar = function () {
    };
    return EditorTexto;
})();

var CursorEstado = (function () {
    function CursorEstado(cursor) {
        this.cursor = cursor;
        this.iniciar();
    }
    CursorEstado.prototype.iniciar = function () {
    };

    CursorEstado.prototype.actualizar = function () {
    };

    CursorEstado.prototype.cuando_suelta_el_mouse = function (x, y) {
    };

    //cuando_hace_click(x, y, boton) {
    //  this.cursor.definir_modo_cursor();
    //}
    CursorEstado.prototype.cuando_mueve_el_scroll = function (grado) {
    };

    CursorEstado.prototype.cuando_mueve_el_mouse = function (x, y) {
        this.cursor.x = x;
        this.cursor.y = y;
    };

    CursorEstado.prototype.cuando_hace_click = function (x, y, boton) {
        this.cursor.pintar_objeto();
    };
    return CursorEstado;
})();

var CursorMovimiento = (function (_super) {
    __extends(CursorMovimiento, _super);
    function CursorMovimiento() {
        _super.apply(this, arguments);
    }
    CursorMovimiento.prototype.actualizar = function () {
    };

    CursorMovimiento.prototype.cuando_suelta_el_mouse = function (x, y) {
    };
    return CursorMovimiento;
})(CursorEstado);

var CursorEscala = (function (_super) {
    __extends(CursorEscala, _super);
    function CursorEscala() {
        _super.apply(this, arguments);
    }
    CursorEscala.prototype.iniciar = function () {
        this.x = this.cursor.x;
        this.escala_inicial = this.cursor.escala;
    };

    CursorEscala.prototype.cuando_mueve_el_scroll = function (grado) {
        this.cursor.escala += grado;
        this.cursor.escala = Math.max(this.cursor.escala, 0.1);
    };
    return CursorEscala;
})(CursorEstado);

var CursorRotacion = (function (_super) {
    __extends(CursorRotacion, _super);
    function CursorRotacion() {
        _super.apply(this, arguments);
    }
    CursorRotacion.prototype.iniciar = function () {
        this.x = this.cursor.x;
        this.rotacion_inicial = this.cursor.rotacion;
    };

    CursorRotacion.prototype.cuando_mueve_el_scroll = function (grado) {
        this.cursor.rotacion += grado;
    };
    return CursorRotacion;
})(CursorEstado);

var CursorTransparencia = (function (_super) {
    __extends(CursorTransparencia, _super);
    function CursorTransparencia() {
        _super.apply(this, arguments);
    }
    CursorTransparencia.prototype.iniciar = function () {
        this.x = this.cursor.x;
        this.transparencia_inicial = this.cursor.transparencia;
    };

    CursorTransparencia.prototype.cuando_mueve_el_scroll = function (grado) {
        this.cursor.transparencia += grado;
    };
    return CursorTransparencia;
})(CursorEstado);

var Cursor = (function (_super) {
    __extends(Cursor, _super);
    function Cursor(editor) {
        _super.call(this, 'aceituna.png', 0, 0);
        window['cursor'] = this;

        this.editor = editor;
        this.estado = new CursorMovimiento(this);
    }
    Cursor.prototype.cuando_mueve_el_mouse = function (x, y) {
        this.estado.cuando_mueve_el_mouse(x, y);
    };

    Cursor.prototype.cuando_suelta_el_mouse = function (x, y) {
        this.estado.cuando_suelta_el_mouse(x, y);
    };

    Cursor.prototype.cuando_mueve_el_scroll = function (grado) {
        this.estado.cuando_mueve_el_scroll(grado);
        return false;
    };

    Cursor.prototype.cuando_hace_click = function (x, y, boton) {
        this.estado.cuando_hace_click(x, y, boton);
    };

    Cursor.prototype.definir_modo_cursor = function () {
        this.estado = new CursorMovimiento(this);
    };

    Cursor.prototype.definir_modo_escala = function () {
        this.estado = new CursorEscala(this);
    };

    Cursor.prototype.definir_modo_rotacion = function () {
        this.estado = new CursorRotacion(this);
    };

    Cursor.prototype.definir_modo_transparencia = function () {
        this.estado = new CursorTransparencia(this);
    };

    Cursor.prototype.pintar_objeto = function () {
        console.log(this.obtener_datos_como_json());
        this.editor.agregar_actor_debajo_del_cursor(this.clonar());
    };

    Cursor.prototype.definir_imagen = function (indice) {
        var texturas = {
            1: 'aceituna.png',
            2: 'caja.png'
        };
        var imagen = texturas[indice];
        this.nombre_imagen = imagen;
        var img = (g.imagenes).cargar(imagen);
        this.sprite.image = img.instanciar().image;
        this.centrar_punto_de_control();
    };

    Cursor.prototype.alternar_flip = function () {
        _super.prototype.alternar_flip.call(this);
    };
    return Cursor;
})(EditorActor);

var Editor = (function () {
    function Editor(canvas_id) {
        this.canvas_id = canvas_id;
        this.canvas = document.getElementById(this.canvas_id);
        this.stage = new createjs.Stage(this.canvas);
        this.actores = [];
        this.conectar_eventos();

        this.cursor = new Cursor(this);
        this.agregar_actor(this.cursor);

        this.texto = new EditorTexto();
        this.agregar_actor(this.texto);
    }
    Editor.prototype.ejecutar = function () {
        var self = this;

        createjs.Ticker.setFPS(60);
        var my_tick = function (event) {
            self.actualizar();
        };
        createjs.Ticker.addEventListener('tick', my_tick);
    };

    Editor.prototype.actualizar = function () {
        for (var i = 0; i < this.actores.length; i++)
            this.actores[i].actualizar();

        this.stage.update();
    };

    Editor.prototype.agregar_actor = function (actor) {
        this.actores.push(actor);

        this.stage.addChild(actor.sprite);
        this.stage.update();
    };

    Editor.prototype.agregar_actor_debajo_del_cursor = function (actor) {
        this.actores.push(actor);

        this.stage.addChild(actor.sprite);
        var pos = this.stage.getChildIndex(actor.sprite);
        this.stage.setChildIndex(this.cursor.sprite, pos);
        this.stage.update();
    };

    Editor.prototype.eliminar_actor = function (actor) {
        var index = this.actores.indexOf(actor);
        this.actores.splice(index, 1);

        this.stage.removeChild(actor.sprite);
        this.stage.update();
    };

    Editor.prototype.conectar_eventos = function () {
        var self = this;

        this.canvas.onmousedown = function (event) {
            var pos = self.obtener_posicion_del_mouse();
            var boton = event.which;
            self.cuando_hace_click(pos.x, pos.y, boton);
        };

        this.canvas.onmouseup = function (event) {
            var pos = self.obtener_posicion_del_mouse();
            self.cuando_suelta_el_mouse(pos.x, pos.y);
        };

        this.canvas.onmousemove = function (event) {
            var pos = self.obtener_posicion_del_mouse();
            self.cuando_mueve_el_mouse(pos.x, pos.y);
        };

        window.onmousewheel = function (event) {
            this.cursor.cuando_mueve_el_scroll(event['wheelDeltaY'] / 200);
        };

        window.onkeydown = function (event) {
            self.cuando_pulsa_tecla(event);
        };

        window.onkeyup = function (event) {
            self.cuando_suelta_tecla(event);
        };
    };

    Editor.prototype.obtener_posicion_del_mouse = function () {
        var x = this.stage.mouseX;
        var y = this.stage.mouseY;
        return { x: x, y: y };
    };

    Editor.prototype.cuando_hace_click = function (x, y, boton) {
        this.cursor.cuando_hace_click(x, y);
    };

    Editor.prototype.cuando_mueve_el_mouse = function (x, y) {
        this.cursor.cuando_mueve_el_mouse(x, y);
    };

    Editor.prototype.cuando_suelta_el_mouse = function (x, y) {
        this.cursor.cuando_suelta_el_mouse(x, y);
    };

    Editor.prototype.cuando_pulsa_tecla = function (evento) {
        switch (evento.keyCode) {
            case 32:
                this.alternar_selector_de_texturas();
                break;

            case 49:
                this.cursor.definir_modo_cursor();
                this.texto.definir_texto("1 - modo cursor");
                break;

            case 50:
                this.cursor.definir_modo_escala();
                this.texto.definir_texto("2 - modo escala");
                break;

            case 51:
                this.cursor.definir_modo_rotacion();
                this.texto.definir_texto("3 - modo rotacion");
                break;

            case 52:
                this.cursor.definir_modo_transparencia();
                this.texto.definir_texto("4 - modo transparencia");
                break;

            case 70:
                this.cursor.alternar_flip();
                break;
        }
    };

    Editor.prototype.cuando_suelta_tecla = function (evento) {
    };

    Editor.prototype.alternar_selector_de_texturas = function () {
        var selector = document.getElementById('selector');
        selector.classList.toggle('selector-oculto');
    };

    Editor.prototype.seleccionar_textura = function (numero_textura) {
        this.alternar_selector_de_texturas();
        this.cursor.definir_imagen(numero_textura);
    };
    return Editor;
})();

function init_editor() {
    var imagenes = new Imagenes(function () {
        g.imagenes = imagenes;
        var editor = new Editor('canvas_editor');
        editor.ejecutar();

        window['seleccionar_textura'] = function (indice) {
            editor.seleccionar_textura(indice);
        };
    }, "data");
}
