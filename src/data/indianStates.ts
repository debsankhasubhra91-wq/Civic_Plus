export interface IndianStateData {
  name: string;
  code: string;
  type: 'State' | 'Union Territory';
  capital: string;
  centerCoordinates: {
    lat: number;
    lng: number;
  };
  cities: string[];
}

export const INDIAN_STATES: IndianStateData[] = [
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    type: 'State',
    capital: 'Amaravati',
    centerCoordinates: { lat: 15.9129, lng: 79.74 },
    cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Kakinada', 'Rajahmundry']
  },
  {
    name: 'Arunachal Pradesh',
    code: 'AR',
    type: 'State',
    capital: 'Itanagar',
    centerCoordinates: { lat: 28.218, lng: 94.7278 },
    cities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro']
  },
  {
    name: 'Assam',
    code: 'AS',
    type: 'State',
    capital: 'Dispur',
    centerCoordinates: { lat: 26.2006, lng: 92.9376 },
    cities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur']
  },
  {
    name: 'Bihar',
    code: 'BR',
    type: 'State',
    capital: 'Patna',
    centerCoordinates: { lat: 25.0961, lng: 85.3131 },
    cities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif']
  },
  {
    name: 'Chhattisgarh',
    code: 'CG',
    type: 'State',
    capital: 'Raipur',
    centerCoordinates: { lat: 21.2787, lng: 81.8661 },
    cities: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon']
  },
  {
    name: 'Goa',
    code: 'GA',
    type: 'State',
    capital: 'Panaji',
    centerCoordinates: { lat: 15.2993, lng: 74.124 },
    cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda']
  },
  {
    name: 'Gujarat',
    code: 'GJ',
    type: 'State',
    capital: 'Gandhinagar',
    centerCoordinates: { lat: 22.2587, lng: 71.1924 },
    cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh']
  },
  {
    name: 'Haryana',
    code: 'HR',
    type: 'State',
    capital: 'Chandigarh',
    centerCoordinates: { lat: 29.0588, lng: 76.0856 },
    cities: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Panchkula']
  },
  {
    name: 'Himachal Pradesh',
    code: 'HP',
    type: 'State',
    capital: 'Shimla',
    centerCoordinates: { lat: 31.1048, lng: 77.1734 },
    cities: ['Shimla', 'Dharamshala', 'Mandi', 'Solan', 'Kullu', 'Manali', 'Baddi']
  },
  {
    name: 'Jharkhand',
    code: 'JH',
    type: 'State',
    capital: 'Ranchi',
    centerCoordinates: { lat: 23.6102, lng: 85.2799 },
    cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh']
  },
  {
    name: 'Karnataka',
    code: 'KA',
    type: 'State',
    capital: 'Bengaluru',
    centerCoordinates: { lat: 15.3173, lng: 75.7139 },
    cities: ['Bengaluru', 'Mysuru', 'Hubballi-Dharwad', 'Mangaluru', 'Belagavi', 'Kalaburagi', 'Ballari', 'Shivamogga']
  },
  {
    name: 'Kerala',
    code: 'KL',
    type: 'State',
    capital: 'Thiruvananthapuram',
    centerCoordinates: { lat: 10.8505, lng: 76.2711 },
    cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur', 'Kannur', 'Alappuzha', 'Palakkad']
  },
  {
    name: 'Madhya Pradesh',
    code: 'MP',
    type: 'State',
    capital: 'Bhopal',
    centerCoordinates: { lat: 22.9734, lng: 78.6569 },
    cities: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna']
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    type: 'State',
    capital: 'Mumbai',
    centerCoordinates: { lat: 19.7515, lng: 75.7139 },
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Navi Mumbai', 'Aurangabad', 'Solapur', 'Kolhapur', 'Kalyan']
  },
  {
    name: 'Manipur',
    code: 'MN',
    type: 'State',
    capital: 'Imphal',
    centerCoordinates: { lat: 24.6637, lng: 93.9063 },
    cities: ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur']
  },
  {
    name: 'Meghalaya',
    code: 'ML',
    type: 'State',
    capital: 'Shillong',
    centerCoordinates: { lat: 25.467, lng: 91.3662 },
    cities: ['Shillong', 'Tura', 'Jowai', 'Nongpoh']
  },
  {
    name: 'Mizoram',
    code: 'MZ',
    type: 'State',
    capital: 'Aizawl',
    centerCoordinates: { lat: 23.1645, lng: 92.9376 },
    cities: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip']
  },
  {
    name: 'Nagaland',
    code: 'NL',
    type: 'State',
    capital: 'Kohima',
    centerCoordinates: { lat: 26.1584, lng: 94.5624 },
    cities: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang']
  },
  {
    name: 'Odisha',
    code: 'OD',
    type: 'State',
    capital: 'Bhubaneswar',
    centerCoordinates: { lat: 20.9517, lng: 85.0985 },
    cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore']
  },
  {
    name: 'Punjab',
    code: 'PB',
    type: 'State',
    capital: 'Chandigarh',
    centerCoordinates: { lat: 31.1471, lng: 75.3412 },
    cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot']
  },
  {
    name: 'Rajasthan',
    code: 'RJ',
    type: 'State',
    capital: 'Jaipur',
    centerCoordinates: { lat: 27.0238, lng: 74.2179 },
    cities: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Sikar']
  },
  {
    name: 'Sikkim',
    code: 'SK',
    type: 'State',
    capital: 'Gangtok',
    centerCoordinates: { lat: 27.533, lng: 88.5122 },
    cities: ['Gangtok', 'Namchi', 'Geyzing', 'Mangan']
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    type: 'State',
    capital: 'Chennai',
    centerCoordinates: { lat: 11.1271, lng: 78.6569 },
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore']
  },
  {
    name: 'Telangana',
    code: 'TG',
    type: 'State',
    capital: 'Hyderabad',
    centerCoordinates: { lat: 18.1124, lng: 79.0193 },
    cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar']
  },
  {
    name: 'Tripura',
    code: 'TR',
    type: 'State',
    capital: 'Agartala',
    centerCoordinates: { lat: 23.9408, lng: 91.9882 },
    cities: ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar']
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    type: 'State',
    capital: 'Lucknow',
    centerCoordinates: { lat: 26.8467, lng: 80.9462 },
    cities: ['Lucknow', 'Kanpur', 'Noida', 'Greater Noida', 'Ghaziabad', 'Varanasi', 'Agra', 'Prayagraj', 'Meerut', 'Bareilly', 'Aligarh', 'Moradabad', 'Gorakhpur', 'Mathura']
  },
  {
    name: 'Uttarakhand',
    code: 'UK',
    type: 'State',
    capital: 'Dehradun',
    centerCoordinates: { lat: 30.0668, lng: 79.0193 },
    cities: ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rishikesh', 'Nainital']
  },
  {
    name: 'West Bengal',
    code: 'WB',
    type: 'State',
    capital: 'Kolkata',
    centerCoordinates: { lat: 22.9868, lng: 87.855 },
    cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Kharagpur', 'Bardhaman', 'Malda']
  },
  {
    name: 'Delhi (NCT)',
    code: 'DL',
    type: 'Union Territory',
    capital: 'New Delhi',
    centerCoordinates: { lat: 28.7041, lng: 77.1025 },
    cities: ['Central Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Dwarka', 'Rohini', 'Connaught Place', 'Saket', 'Lajpat Nagar', 'Vasant Kunj', 'Janakpuri']
  },
  {
    name: 'Chandigarh',
    code: 'CH',
    type: 'Union Territory',
    capital: 'Chandigarh',
    centerCoordinates: { lat: 30.7333, lng: 76.7794 },
    cities: ['Sector 17', 'Sector 35', 'Sector 22', 'Manimajra', 'Industrial Area']
  },
  {
    name: 'Jammu and Kashmir',
    code: 'JK',
    type: 'Union Territory',
    capital: 'Srinagar / Jammu',
    centerCoordinates: { lat: 33.7782, lng: 76.5762 },
    cities: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Kathua']
  },
  {
    name: 'Ladakh',
    code: 'LA',
    type: 'Union Territory',
    capital: 'Leh',
    centerCoordinates: { lat: 34.1526, lng: 77.5771 },
    cities: ['Leh', 'Kargil', 'Nubra', 'Drass']
  },
  {
    name: 'Puducherry',
    code: 'PY',
    type: 'Union Territory',
    capital: 'Puducherry',
    centerCoordinates: { lat: 11.9416, lng: 79.8083 },
    cities: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam']
  },
  {
    name: 'Andaman and Nicobar Islands',
    code: 'AN',
    type: 'Union Territory',
    capital: 'Port Blair',
    centerCoordinates: { lat: 11.7401, lng: 92.6586 },
    cities: ['Port Blair', 'Havelock Island', 'Neil Island', 'Diglipur']
  },
  {
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    code: 'DN',
    type: 'Union Territory',
    capital: 'Daman',
    centerCoordinates: { lat: 20.3974, lng: 72.8328 },
    cities: ['Daman', 'Diu', 'Silvassa']
  },
  {
    name: 'Lakshadweep',
    code: 'LD',
    type: 'Union Territory',
    capital: 'Kavaratti',
    centerCoordinates: { lat: 10.5667, lng: 72.6417 },
    cities: ['Kavaratti', 'Agatti', 'Andrott', 'Minicoy']
  }
];
