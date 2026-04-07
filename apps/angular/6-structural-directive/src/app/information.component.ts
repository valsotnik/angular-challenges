import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-information',
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div>visible only for super admin</div>
    <div>visible if manager</div>
    <div>visible if manager and/or reader</div>
    <div>visible if manager and/or writer</div>
    <div>visible if client</div>
    <div>visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {}
