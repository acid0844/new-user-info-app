import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    address: '',
    dependents: 0,
  }),
  actions: {
    updateName(name: string) {
      this.name = name
    },
    updateAddress(address: string) {
      this.address = address
    },
    updateDependents(count: number) {
      this.dependents = count
    },
  },
})
