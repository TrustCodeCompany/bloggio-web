import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      id: null,
      userName: null,
      email: null,
      password: null,
      token: null,
      logged: false,
      userShortBio: null,
      userAvatar: null,
      reactiveAccount: false,
      role: [],

      setLogged: () =>
        set((state) => ({
          logged: !state.logged
        })),

      setUser: (id, nombre, correo, token, avatar, bio, reactiveAccount) =>
        set(() => ({
          id,
          userName: nombre,
          email: correo,
          token,
          logged: true,
          userAvatar: avatar,
          userShortBio: bio,
          userReactiveAccount: reactiveAccount
        })),

      setUserAvatar: (avatar) =>
        set(() => ({
          userAvatar: avatar
        })),

      logoutUser: () =>
        set(() => ({
          id: null,
          userName: null,
          email: null,
          token: null,
          logged: false,
          userAvatar: null,
          userShortBio: null
        }))
    }),
    {
      name: 'userState',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userName: state.userName,
        id: state.id,
        logged: state.logged,
        userAvatar: state.userAvatar,
        userShortBio: state.userShortBio,
        userReactiveAccount: state.userReactiveAccount
      })
    }
  )
)
