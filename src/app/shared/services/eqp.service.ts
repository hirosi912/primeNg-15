import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

import { EqpApiService } from './api/eqp-api.service';
import { SetUserPinStepEqpParam } from 'src/app/features/posting/models'

@Injectable({
    providedIn: 'root',
})
export class EqpService {

    constructor(
        private eqpApiService: EqpApiService
    ) { }

    /*  */
    getAllFacility() {
        return this.eqpApiService.getAllFacilities().pipe(
            map((response) => {
                return response.AllFacilities['T_AllFacilities']?.map((value: any) => {
                    return {
                        label: value['Name'],
                        value: value['FacilityId'],
                    };
                });
            })
        );
    }

    /*  */
    GetAreasFormFacility(facilityId: string) {
        return this.eqpApiService.GetAreasFormFacility(facilityId).pipe(
            map((response) => {
                return response.AllAreas['T_AllAreasFromFacility']?.map((value: any) => {
                    return {
                        label: value['Name'],
                        value: value['AreaId'],
                    };
                });
            })
        );
    }

    /*  */
    GetStepsFormArea(areaId: string) {
        return this.eqpApiService.GetStepsFormArea(areaId).pipe(
            map((response) => {
                return response.StepResourcesForAreaCollection?.map((value: any) => {
                    return {
                        label: value.Step.Name,
                        value: value.Step.Id,
                    };
                });
            })
        );
    }

    getResourcesForStep(stepId: string) {
        return this.eqpApiService.GetResourcesForStep(stepId).pipe(
            map((response) => {
                return response.ResourceCollection?.map((value: any) => {
                    return {
                        resourceName: value.Name,
                        id: value.Id,
                        eqpStatus: value.CurrentMainState.CurrentState.Name,
                    };
                });
            })
        );
    }

    getEqpDetail(eqpId: string) {
        return this.eqpApiService.getEqpDetail(eqpId).pipe(
            map((response: any) => {
                return {
                    basicInfo: {
                        eqpId: response.ResourceInfo.Id,
                        eqpName: response.ResourceInfo.Name,
                        mfgNote: '',
                        engNote: '',
                    },
                    durableInfo: getDurableInfo(response),
                    materialInfo: getMaterialInfo(response),
                }
            })
        );
    }

    getUserPinStepEqp() {
        return this.eqpApiService.getUserPinStepEqp().pipe(
          map((response) => {
            return response;
          })
        );
      }

    setUserPinStepEqp(input: SetUserPinStepEqpParam) {
        return this.eqpApiService.setUserPinStepEqp(input).pipe(
            map((response) => {
                return response;
            })
        );
    }

    getLotMaterialForEqp(eqpName: string, lotStatus: number, stepId: string) {
        return this.eqpApiService.getLotMaterialForEqp(eqpName, lotStatus, stepId).pipe(
            map((response) => {
                return response;
            })
        );
    }

}


function getDurableInfo(eqp: any) {
    const result = Array.from(
        { length: +eqp.ResourceInfo.DurablePositions },
        (_, i) => ({ id: null, durableName: '', position: i + 1, description: '' })
    );

    const durables = eqp.ResourceInfo.RelationCollection
        ? eqp.ResourceInfo.RelationCollection['ResourceDurable']
        : null;

    if (durables && durables.length > 0) {
        durables.forEach((value: any) => {
            result[value.Position - 1].durableName = value.TargetEntity.Name;
            result[value.Position - 1].id = value.TargetEntity.Id;
            result[value.Position - 1].description = value.TargetEntity.Description;
        });
    }
    return result;
}

function getMaterialInfo(eqp: any) {
    const result = eqp.MaterialsInfo.map((value: any) => {
        return {
            id: value.Id,
            name: value.Name,
        };
    });
    return result;
}
