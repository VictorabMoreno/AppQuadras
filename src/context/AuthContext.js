// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const users = {
    'LuisSantiago!dev': { password: 'senha1', name: 'Luis Santiago', email: 'luis.santiago@exemplo.com', profilePic: 'luis.jpg' },
    'PedroGay!dev': { password: 'senha2', name: 'Pedro Gay', email: 'pedro.gay@exemplo.com', profilePic: 'pedro.jpg' },
    'VictorMoreno!dev': { password: 'senha3', name: 'Victor Moreno', email: 'victor.moreno@exemplo.com', profilePic: 'https://instagram.fbhz1-1.fna.fbcdn.net/v/t51.2885-19/375084672_178473431934566_3607035735551372769_n.jpg?_nc_ht=instagram.fbhz1-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=uRlR9i6j1PwQ7kNvgFsI2o4&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYB78uXEeuY8x_8WhzRRvhoOes8MlwR1NCqFXDkb8d5MVQ&oe=66C198B7&_nc_sid=bef7bc' }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username, password) => {
        const currentUser = users[username];
        if (currentUser && currentUser.password === password) {
            setUser(currentUser);
            localStorage.setItem('user', JSON.stringify(currentUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
