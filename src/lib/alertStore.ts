type AlertLocation = {
  location: string;
  lat: number;
  lng: number;
};

let selectedAlert: AlertLocation | null = null;

export const alertStore = {
  setAlert: (data: AlertLocation) => {
    selectedAlert = data;
    window.dispatchEvent(new Event("alert-change"));
  },

  getAlert: () => selectedAlert,
};