export * from './animal-species.service';
import { AnimalSpeciesService } from './animal-species.service';
export * from './clinics.service';
import { ClinicsService } from './clinics.service';
export * from './visit-types.service';
import { VisitTypesService } from './visit-types.service';
export * from './visits.service';
import { VisitsService } from './visits.service';
export const APIS = [AnimalSpeciesService, ClinicsService, VisitTypesService, VisitsService];
