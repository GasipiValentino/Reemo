import { reactive } from 'vue';

const alerts = reactive([]);

function addAlert(message, severity) {
  // Enliminamos alerta existente y si existe se elimina
  const existingAlert = alerts.find(alert => alert.message === message);
  if (existingAlert) {
    alerts.splice(alerts.indexOf(existingAlert), 1);
  }

  // Agregamos la nueva alerta al inicio de la lista
  alerts.unshift({ message, severity, id:Date.now() });

  // Limpiar alerta después de 3 segundos
  setTimeout(() => removeAlert(alerts[0].id), 3000);
}

function removeAlert(id) {
  const index = alerts.findIndex(alert => alert.id === id);
  if (index !== -1) {
    alerts.splice(index, 1);
  }
}

export { alerts, addAlert, removeAlert };
