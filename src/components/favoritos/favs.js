import Swal from 'sweetalert2'

const getFavFromStorage = () => {
    const localData = localStorage.getItem('favs');
    return localData ? JSON.parse(localData) : [];
  };
  
  const setFavInStorage = (product) => {
    return new Promise((resolve, reject) => {
        try {
            const storageFavs = getFavFromStorage();
            const isFavOnList = storageFavs.filter((fav) => fav.id === product.id);
            if (isFavOnList.length === 0) {
                storageFavs.push(product);
                localStorage.setItem('favs', JSON.stringify(storageFavs));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Favorito agregado correctamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
                // alert('Producto agregado a favoritos');
            } else {
                alert('Producto ya se encuentra en favoritos');
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const removeFavInStorage = (id) => {
    return new Promise((resolve, reject) => {
        try {
            let storageFavs = getFavFromStorage();
            const index = storageFavs.findIndex((fav) => fav.id === id);
            if (index !== -1) {
                storageFavs.splice(index, 1);
                localStorage.setItem('favs', JSON.stringify(storageFavs));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Favorito eliminado correctamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
            } else {
                alert('El producto no está en la lista de favoritos');
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

  
  const isFavorited = (id) => {
    const localData = getFavFromStorage();
    const isFavOnList = localData.filter((fav) => {
      return fav.id === id;
    });
    return isFavOnList.length === 1;
  };
  
  export { isFavorited, removeFavInStorage, getFavFromStorage, setFavInStorage };


