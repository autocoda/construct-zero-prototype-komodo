import {createStore} from 'vuex'
import {ICompletedSteps} from '@/imports/interfaces/store/ICompletedSteps'
import {IMaterialStep} from '@/imports/interfaces/store/IMaterialStep'

const initialState = () => ({
    materials: {
      mortar: null,
      mortarEmissions: null,
      bricks: null,
      bricksEmissions: null,
      vehicleType: null,
      vehicleTotalTravel: null,
      vehicleEmissions: null,
    },
    materialsStepEmissions: null,
    equipment: [
      {
        "equipmentName": null,
        "powerTypeEmissions": null,
        "powerType": null,
        "measureUnitType": null,
        "itemCount": null,
        "transportDistance": null,
        "transportModeEmissions": null,
        "emissions": null,
        "completed": false
      }
    ],
    equipmentStepEmissions: null,
    personnel: [
      {
        'vehicleCount': null,
        'transportMode': null,
        'transportModeEmissions': null,
        'transportDistance': null,
        "emissions": null,
        "completed": false
      }
    ],
    personnelStepEmissions: null,
    stepsCompleted: {
      'landing': false,
      'materials': false,
      'equipment': false,
      'personnel': false,
      'personnel-compact': false,
      'personnel-detailed': false,
      'summary': false,
    },
})

const store = createStore({
  state: initialState(),
  getters: {
    getStepsCompleted(state) {
      return state.stepsCompleted
    },
    getMaterials(state) {
      return state.materials
    },
    getMaterialsStepEmissions(state) {
      return state.materialsStepEmissions
    },
    getEquipmentStepEmissions(state) {
      return state.equipmentStepEmissions
    },
    getEquipment(state) {
      return state.equipment
    },
    getPersonnel(state) {
      return state.personnel
    },
    getPersonnelStepEmissions(state) {
      return state.personnelStepEmissions
    },
  },
  mutations: {
    resetStoreState(state) {
      Object.assign(state, initialState())
    },
    resetPersonnelState(state) {
      state.personnel = [
        {
          'vehicleCount': null,
          'transportMode': null,
          'transportModeEmissions': null,
          'transportDistance': null,
          "emissions": null,
          "completed": false
        }
      ]
    },
    updateStepsCompleted(state, payload) {
      const [index, value] = payload;
      const stepKey: keyof ICompletedSteps = index;
      state.stepsCompleted[stepKey] = value;
    },
    updateMaterials(state, payload) {
      const [index, value] = payload;
      const materialKey: keyof IMaterialStep = index;
      state.materials[materialKey] = value;
    },
    updateMaterialsStepEmissions(state, payload) {
      state.materialsStepEmissions = payload;
    },
    updateEquipmentStepEmissions(state, payload) {
      state.equipmentStepEmissions = payload;
    },
    updateEquipment(state, payload) {
      state.equipment.push(payload);
    },
    updateEquipmentPowerType(state, payload) {
      const [index, name] = payload;
      state.equipment[index]['powerType'] = name;
    },
    updateEquipmentPowerTypeEmissions(state, payload) {
      const [index, name] = payload;
      state.equipment[index]['powerTypeEmissions'] = name;
    },
    updateEquipmentPowerUnitName(state, payload) {
      const [index, name] = payload;
      state.equipment[index]['measureUnitType'] = name;
    },
    updateEquipmentEmissions(state, payload) {
      const [index, value] = payload;
      state.equipment[index]['emissions'] = value;
    },
    updateEquipmentDataCompletion(state, payload) {
      const [index, value] = payload;
      state.equipment[index]['completed'] = value;
    },
    updatedCompletedSteps(state, payload) {
      state.materialsStepEmissions = payload;
    },
    updateSingleEquipmentByKey(state, [index, value]) {
      state.equipment[index] = value;
    },
    removeSingleEquipmentByKey(state, payload) {
      state.equipment.splice(payload, 1);
    },
    updatePersonnel(state, payload) {
      state.personnel.push(payload);
    },
    updateSinglePersonnelByKey(state, [index, value]) {
      state.personnel[index] = value;
    },
    updatePersonnelTransportModeName(state, payload) {
      const {index, name} = payload;
      state.personnel[index]['transportMode'] = name;
    },
    removeSinglePersonnelByKey(state, payload) {
      state.personnel.splice(payload, 1);
    },
    updatePersonnelStepEmissions(state, payload) {
      state.personnelStepEmissions = payload;
    },
    updatePersonnelRowEmissions(state, payload) {
      const [index, value] = payload;
      state.personnel[index]['emissions'] = value;
    },
    updatePersonnelRowDataCompletion(state, payload) {
      const [index, value] = payload;
      state.personnel[index]['completed'] = value;
    },
  },
  actions: {
    resetState({ commit }) {
      commit('resetStoreState')
    },
    resetPersonnelState({ commit }) {
      commit('resetPersonnelState')
    },
  }
})

export default store;