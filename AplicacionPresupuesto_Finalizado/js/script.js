document.addEventListener("DOMContentLoaded", () => {
    // Función para renderizar todas las transacciones
    const renderizarTransacciones = () => {
        const listaIngresos = document.getElementById("lista-ingresos");
        const listaEgresos = document.getElementById("lista-egresos");
        
        // Limpiar listas
        listaIngresos.innerHTML = '';
        listaEgresos.innerHTML = '';
        
        // Renderizar ingresos
        PresupuestoApp.ingresos.forEach(transaccion => {
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                <span>${transaccion.descripcion}</span>
                <span class="badge bg-success rounded-pill">+$${transaccion.monto.toFixed(2)}</span>
            `;
            listaIngresos.appendChild(item);
        });
        
        // Renderizar egresos
        PresupuestoApp.egresos.forEach(transaccion => {
            const porcentaje = PresupuestoApp.calcularTotalIngresos() > 0 
                ? (transaccion.monto / PresupuestoApp.calcularTotalIngresos() * 100).toFixed(1)
                : '0.0';
            
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                <span>${transaccion.descripcion}</span>
                <div>
                    <span class="badge bg-danger rounded-pill me-2">-$${transaccion.monto.toFixed(2)}</span>
                    <small class="text-muted">${porcentaje}%</small>
                </div>
            `;
            listaEgresos.appendChild(item);
        });
    };
    
    // Función para actualizar los totales
    const actualizarTotales = () => {
        document.getElementById("ingresos-total").textContent = `$${PresupuestoApp.calcularTotalIngresos().toFixed(2)}`;
        document.getElementById("egresos-total").textContent = `$${PresupuestoApp.calcularTotalEgresos().toFixed(2)}`;
        document.getElementById("presupuesto-total").textContent = `$${PresupuestoApp.calcularSaldo().toFixed(2)}`;
        document.getElementById("porcentaje-egresos").textContent = `${PresupuestoApp.calcularPorcentajeGastos().toFixed(2)}%`;
    };
    
    // Función para inicializar
    const inicializar = () => {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const fecha = new Date();
        document.getElementById("titulo-presupuesto").textContent = 
            `Presupuesto de ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
        
        renderizarTransacciones();
        actualizarTotales();
    };
    
    // Manejador del formulario
    document.getElementById("agregar-transaccion").addEventListener("click", (e) => {
        e.preventDefault();
        
        const tipo = document.getElementById("tipo-transaccion").value;
        const descripcion = document.getElementById("descripcion").value.trim();
        const monto = parseFloat(document.getElementById("monto").value);
        
        if (!descripcion || isNaN(monto) || monto <= 0) {
            alert("Por favor ingrese una descripción válida y un monto positivo");
            return;
        }
        
        if (PresupuestoApp.agregarTransaccion(tipo, descripcion, monto)) {
            document.getElementById("descripcion").value = '';
            document.getElementById("monto").value = '';
            
            renderizarTransacciones();
            actualizarTotales();
        }
    });

    inicializar();
});