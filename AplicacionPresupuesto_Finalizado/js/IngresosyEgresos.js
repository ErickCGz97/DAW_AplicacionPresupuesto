var PresupuestoApp = {
    ingresos: [],
    egresos: [],
    
    agregarTransaccion: function(tipo, descripcion, monto) {
        if (tipo === 'ingreso') {
            return this.agregarIngreso(descripcion, monto);
        } else if (tipo === 'egreso') {
            return this.agregarEgreso(descripcion, monto);
        }
        return false;
    },
    
    agregarIngreso: function(descripcion, monto) {
        if (typeof monto !== 'number' || monto <= 0) {
            console.error("Monto inválido");
            return false;
        }

        if (!descripcion || descripcion.trim() === '') {
            console.error("Descripción requerida");
            return false;
        }

        this.ingresos.push({
            id: Date.now(),
            descripcion: descripcion,
            monto: monto,
            fecha: new Date()
        });
        
        this.guardarDatos();
        return true;
    },
    
    agregarEgreso: function(descripcion, monto) {
        if (typeof monto !== 'number' || monto <= 0) {
            console.error("Monto inválido");
            return false;
        }
        
        if (!descripcion || descripcion.trim() === '') {
            console.error("Descripción requerida");
            return false;
        }
        
        this.egresos.push({
            id: Date.now(),
            descripcion: descripcion,
            monto: monto,
            fecha: new Date()
        });
        
        this.guardarDatos();
        return true;
    },
    
    calcularTotales: function() {
        return {
            ingresos: this.calcularTotalIngresos(),
            egresos: this.calcularTotalEgresos(),
            saldo: this.calcularSaldo(),
            porcentaje: this.calcularPorcentajeGastos()
        };
    },
    
    calcularTotalIngresos: function() {
        return this.ingresos.reduce((total, ing) => total + ing.monto, 0);
    },
    
    calcularTotalEgresos: function() {
        return this.egresos.reduce((total, egr) => total + egr.monto, 0);
    },
    
    calcularSaldo: function() {
        return this.calcularTotalIngresos() - this.calcularTotalEgresos();
    },
    
    calcularPorcentajeGastos: function() {
        const ingresos = this.calcularTotalIngresos();
        return ingresos === 0 ? 0 : (this.calcularTotalEgresos() / ingresos) * 100;
    },
    
    guardarDatos: function() {
        localStorage.setItem('presupuestoApp', JSON.stringify({
            ingresos: this.ingresos,
            egresos: this.egresos
        }));
    },
    
    cargarDatos: function() {
        const datos = localStorage.getItem('presupuestoApp');
        if (datos) {
            const parsed = JSON.parse(datos);
            this.ingresos = parsed.ingresos || [];
            this.egresos = parsed.egresos || [];
        }
    }
};
PresupuestoApp.cargarDatos();