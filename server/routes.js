import fs from "fs";

const FILE_PATH = "./data/routes.json";

export function getRoutes() {
  if (!fs.existsSync(FILE_PATH)) return [];

  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  if (!data) return []; 

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error('Ошибка парсинга routes.json:', err);
    return [];
  }
}

export function addRoute(route) {
    const routes = getRoutes();
    const newRoute = {id: routes.length + 1,...route}; 
    routes.push(newRoute);
    fs.writeFileSync(FILE_PATH, JSON.stringify(routes,null,2));
    return newRoute;
}

export function updateRoute(index) {
    const routes = getRoutes();
    routes[index] = route;
    fs.writeFileSync(FILE_PATH, JSON.stringify(routes,null,2));
    return routes[index];
}

export function deleteRoute(index) {
    const routes = getRoutes();
    routes = routes.filter((i) => i.id != index );
    fs.writeFileSync(FILE_PATH, JSON.stringify(routes,null,2));
    return true;
}