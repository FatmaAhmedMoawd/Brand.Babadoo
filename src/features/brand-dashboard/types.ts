export interface ProductItem {
  id: number;
  name: string;
  category: string;
  totalSales: string;
  change: string;
  image: string;
}

export interface ActivityItem {
  id: number;
  user: string;
  initials: string;
  action: string;
  time: string;
  avatarColor: string; // Tailwind class like bg-[#FFF5EC] for AH
}

export interface OrderItem {
  id: string;
  customerName: string;
  customerId: string;
  date: string;
  time: string;
  amount: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  iconType: 'order' | 'payment' | 'branch';
}
