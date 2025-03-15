import { Component } from '@angular/core';

@Component({
  selector: 'app-policy',
  standalone: false,
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
  selectedPolicy: string = 'Sales Policy';
  selectedPolicyContent: string = '';

  policies = [
    { 
      title: 'Sales Policy', 
      content: `
        <ol class="mx-3">
          <li><b>Payment</b>
            <ul>
              <li><b>Deposit:</b> Orders over <b>5,000,000 VND</b> require a deposit of <b>500,000 VND</b> before delivery. The remaining balance is due upon receipt.</li>
              <li><b>Order Cancellation:</b> Deposits are <b>non-refundable</b> after placement.</li>
            </ul>
          </li>
          <li><b>Fees and Payment Process After Delivery</b>
            <ul>
              <li><b>Failure to Pay:</b> Unpaid products will be retrieved by The Kanso.</li>
              <li><b>Delivery Fee:</b> An additional <b>200,000 VND</b> fee applies for specific areas.</li>
              <li><b>Additional Fees:</b> Costs such as transportation or elevator fees must be paid directly to property management.</li>
            </ul>
          </li>
          <li><b>Invoice Issuance</b>
            <ul>
              <li><b>Invoice Request:</b> Must be made at the time of ordering.</li>
              <li><b>Deadline:</b> Requests after <b>24 hours</b> will not be accepted.</li>
              <li><b>Issued Invoices:</b> Cannot be modified or canceled and will be sent within <b>7 days</b> (excluding weekends and holidays).</li>
            </ul>
          </li>
        </ol>
      `
    },
    { 
      title: 'Shipping & Installation Policy', 
      content: `
        <ol class="mx-3">
          <li><b>Free Shipping & Installation</b>
            <p>The Kanso offers <b>free shipping and installation</b> within <b>3 business days</b> in these areas:</p>
            <ul>
              <li>Hanoi, Ho Chi Minh City, Thu Duc City, Long An, Bien Hoa, Binh Duong.</li>
              <li>Urban areas: Ecopark, Ocean Park 2 & 3, Xuan Quan, Van Giang, Hung Yen.</li>
              <li>Long An: Free shipping every <b>Wednesday</b>.</li>
            </ul>
          </li>
          <li><b>Areas with Shipping & Installation Fees</b>
            <ul>
              <li><b>Bac Tan Uyen:</b> 200,000 VND</li>
              <li><b>Bau Bang, Ben Cat:</b> 250,000 VND</li>
              <li><b>Phu Giao:</b> 500,000 VND</li>
              <li><b>Dau Tieng:</b> 600,000 VND</li>
            </ul>
          </li>
        </ol>
      `
    },
    { 
      title: 'Warranty & Maintenance Policy', 
      content: `
        <ol class="mx-3">
          <li><b>Warranty Period</b>
            <p><b>Warranty Duration:</b> 2 years from the successful delivery date.</p>
          </li>
          <li><b>Warranty Coverage</b>
            <ul>
              <li>Material defects (excluding natural variations in wood grain or knots).</li>
              <li>Technical errors from the manufacturing process.</li>
              <li>Installation errors by The Kanso.</li>
            </ul>
          </li>
          <li><b>Exclusions</b>
            <ul>
              <li>Damage caused by natural disasters, fire, explosions.</li>
              <li>Self-transportation, modifications, improper usage.</li>
              <li>Water damage, warping, exposure to extreme humidity.</li>
              <li>Normal wear and tear (fading, cushion sinking, etc.).</li>
            </ul>
          </li>
          <li><b>Maintenance Policy</b>
            <p><b>Lifetime maintenance</b> is available at a reasonable cost.</p>
          </li>
        </ol>
      `
    },
    { 
      title: 'Return & Exchange Policy', 
      content: `
        <ol class="mx-3">
          <li><b>Exchange Policy</b>
            <p>Customers can exchange a product <b>within 3 days</b> from delivery (excluding Sundays & public holidays) if:</p>
            <ul>
              <li>The product has material defects, technical issues, or installation errors.</li>
              <li>Exchange is for an item of <b>equal or higher value</b>.</li>
            </ul>
          </li>
          <li><b>Return Policy</b>
            <ul>
              <li>Returns are <b>only accepted at the time of delivery</b> if the product does not match the order.</li>
              <li><b>Return Fees:</b> <b>300,000 VND</b> shipping & installation fees apply.</li>
            </ul>
          </li>
        </ol>
      `
    }
  ];

  constructor() {
    this.setSelectedPolicy(this.selectedPolicy);
  }

  setSelectedPolicy(policyTitle: string) {
    this.selectedPolicy = policyTitle;
    const policy = this.policies.find(p => p.title === policyTitle);
    this.selectedPolicyContent = policy ? policy.content : '';
  }
}
