import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {ComptesComponent} from "./comptes/comptes.component";
import {CreditsComponent} from "./credits/credits.component";
import {OperationsComponent} from "./operations/operations.component";
import {PredictComponent} from "./predict/predict.component";

const routes: Routes = [
  {path:"clients",component:ClientComponent},
  {path:"comptes",component:ComptesComponent},
  {path:"credits",component:CreditsComponent},
  {path:"operations",component:OperationsComponent},
  {path:"predict",component:PredictComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
