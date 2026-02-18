import { useState, useEffect } from 'react';

export interface BookingData {
  email: string;
  phoneNumber: string;
  name: string;
  bookingStatus: string;
  callDate: string;
  callTime: string;
  serviceType: string;
  callDurationSeconds: number;
  callDurationMinutes: number;
  cost: number;
  afterHoursBeforeHours: string;
}

export function useGoogleSheets(sheetId: string) {
  const [data, setData] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Method 1: Google Visualization API (works with "Anyone with link" sharing)
        const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
        
        // Method 2: Direct CSV export
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;
        
        let csvText = '';
        let fetchSuccess = false;
        
        // Try Google Visualization API first
        try {
          const response = await fetch(gvizUrl);
          if (response.ok) {
            csvText = await response.text();
            // Remove the Google Visualization API wrapper if present
            if (csvText.startsWith('google.visualization.Query.setResponse')) {
              // Extract CSV from the wrapper
              const match = csvText.match(/.*?({.*})/);
              if (match) {
                const jsonData = JSON.parse(match[1]);
                // Convert JSON to CSV format
                if (jsonData.table && jsonData.table.rows) {
                  const headers = jsonData.table.cols.map((col: any) => col.label || '').join(',');
                  const rows = jsonData.table.rows.map((row: any) => 
                    row.c.map((cell: any) => cell?.v || '').join(',')
                  ).join('\n');
                  csvText = headers + '\n' + rows;
                }
              }
            }
            if (csvText && csvText.length > 50 && !csvText.includes('<!DOCTYPE html>')) {
              fetchSuccess = true;
            }
          }
        } catch (err) {
          console.log('Visualization API failed, trying direct export');
        }
        
        // Try direct CSV export if first method failed
        if (!fetchSuccess) {
          try {
            const response = await fetch(csvUrl);
            if (response.ok) {
              csvText = await response.text();
              if (csvText && csvText.length > 50 && !csvText.includes('<!DOCTYPE html>')) {
                fetchSuccess = true;
              }
            }
          } catch (err) {
            console.log('Direct export failed');
          }
        }

        // If both methods failed, use demo data
        if (!fetchSuccess || !csvText) {
          console.log('Using demo data - enable sheet sharing to see live data');
          setData(getMockData());
          setLoading(false);
          return;
        }

        const rows = csvText.split('\n');
        
        // Skip header row and parse data
        const parsedData: BookingData[] = rows
          .slice(1)
          .filter(row => row.trim())
          .map(row => {
            // Handle CSV parsing with potential commas in fields
            const values = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
            const cleanValues = values.map(v => v.replace(/^"|"$/g, '').trim());
            
            return {
              email: cleanValues[0] || '',
              phoneNumber: cleanValues[1] || '',
              name: cleanValues[2] || '',
              bookingStatus: cleanValues[3] || '',
              callDate: cleanValues[4] || '',
              callTime: cleanValues[5] || '',
              serviceType: cleanValues[6] || '',
              callDurationSeconds: parseFloat(cleanValues[7]) || 0,
              callDurationMinutes: parseFloat(cleanValues[8]) || 0,
              cost: parseFloat(cleanValues[9]) || 0,
              afterHoursBeforeHours: cleanValues[10] || '',
            };
          });

        if (parsedData.length > 0) {
          setData(parsedData);
          console.log(`Successfully loaded ${parsedData.length} bookings from Google Sheets`);
        } else {
          setData(getMockData());
        }
      } catch (err) {
        console.log('Using demo data:', err);
        setData(getMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh data every 2 minutes
    const interval = setInterval(fetchData, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [sheetId]);

  return { data, loading, error };
}

// Mock data for demonstration/fallback
function getMockData(): BookingData[] {
  return [
    {
      email: 'raneshsamara@outlook.com',
      phoneNumber: '',
      name: 'palmer shelby',
      bookingStatus: 'confirmed',
      callDate: '2026-01-01',
      callTime: '3:33 PM',
      serviceType: 'Men\'s Haircut',
      callDurationSeconds: 60,
      callDurationMinutes: 1,
      cost: 0,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'lokitha.nilawera@gmail.com',
      phoneNumber: '123-123-1234',
      name: 'lokitha',
      bookingStatus: 'cancelled',
      callDate: '2026-01-01',
      callTime: '4:15 PM',
      serviceType: '',
      callDurationSeconds: 123,
      callDurationMinutes: 2.05,
      cost: 0,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'danish@gmail.com',
      phoneNumber: '12345678',
      name: 'dash',
      bookingStatus: 'confirmed',
      callDate: '2026-01-02',
      callTime: '10:23 AM',
      serviceType: 'Women\'s Haircut',
      callDurationSeconds: 90,
      callDurationMinutes: 1.5,
      cost: 0,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'sasura.pulaperuma@gmail.com',
      phoneNumber: '9899488092',
      name: 'sastora',
      bookingStatus: 'confirmed',
      callDate: '2026-01-02',
      callTime: '2:45 PM',
      serviceType: 'Women\'s Haircut',
      callDurationSeconds: 75,
      callDurationMinutes: 1.25,
      cost: 0,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'sasura.pullaperuma@gmail.com',
      phoneNumber: '9899488092',
      name: 'sasura',
      bookingStatus: 'confirmed',
      callDate: '2026-01-06',
      callTime: '06:10 PM',
      serviceType: 'Men\'s Haircut',
      callDurationSeconds: 180,
      callDurationMinutes: 3,
      cost: 0,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'lokitha.nilaweera@gmail.com',
      phoneNumber: '1231231234',
      name: 'lokitha nilaweera',
      bookingStatus: 'cancelled',
      callDate: '2026-01-07',
      callTime: '10:29 PM',
      serviceType: '',
      callDurationSeconds: 165,
      callDurationMinutes: 2.75,
      cost: 0,
      afterHoursBeforeHours: 'After Hours',
    },
    {
      email: 'lokitha.nilaweera@gmail.com',
      phoneNumber: '1231231234',
      name: 'lokitha',
      bookingStatus: 'cancelled',
      callDate: '2026-01-07',
      callTime: '10:24 PM',
      serviceType: '',
      callDurationSeconds: 135,
      callDurationMinutes: 2.25,
      cost: 0,
      afterHoursBeforeHours: 'After Hours',
    },
    {
      email: 'roger.david@gmail.com',
      phoneNumber: '123-123-1234',
      name: 'roger',
      bookingStatus: 'confirmed',
      callDate: '2026-01-10',
      callTime: '11:54 PM',
      serviceType: 'Men\'s Haircut',
      callDurationSeconds: 109,
      callDurationMinutes: 1.82,
      cost: 0.2062,
      afterHoursBeforeHours: 'After Hours',
    },
    {
      email: 'sam.alton@rocketmail.com',
      phoneNumber: '9879879876',
      name: 'sam alton',
      bookingStatus: 'confirmed',
      callDate: '2026-01-12',
      callTime: '11:02 AM',
      serviceType: 'Men\'s Haircut',
      callDurationSeconds: 115,
      callDurationMinutes: 1.92,
      cost: 0.1383,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'alicia.bikar@gmail.com',
      phoneNumber: '1231231234',
      name: 'alicia',
      bookingStatus: 'confirmed',
      callDate: '2026-01-12',
      callTime: '2:30 PM',
      serviceType: 'Women\'s Haircut',
      callDurationSeconds: 100,
      callDurationMinutes: 1.67,
      cost: 0.2004,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'trox@gmail.com',
      phoneNumber: '902-468-9896',
      name: 'devon',
      bookingStatus: 'confirmed',
      callDate: '2026-01-27',
      callTime: '11:50 PM',
      serviceType: 'Men\'s Haircut',
      callDurationSeconds: 158,
      callDurationMinutes: 2.63,
      cost: 0.3444,
      afterHoursBeforeHours: 'After Hours',
    },
    {
      email: 'raymond@gmail.com',
      phoneNumber: '1234123412',
      name: 'raymond',
      bookingStatus: 'cancelled',
      callDate: '2026-01-28',
      callTime: '2:46',
      serviceType: '',
      callDurationSeconds: 0,
      callDurationMinutes: 0,
      cost: 0,
      afterHoursBeforeHours: 'After Hours',
    },
    {
      email: 'loki@gmail.com',
      phoneNumber: '1231231234',
      name: 'loki',
      bookingStatus: 'confirmed',
      callDate: '2026-02-03',
      callTime: '13:06',
      serviceType: 'Men\'s Haircut',
      callDurationSeconds: 0,
      callDurationMinutes: 0,
      cost: 0,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'shamir@gmail.com',
      phoneNumber: '1231231234',
      name: 'shamir',
      bookingStatus: 'confirmed',
      callDate: '2026-02-05',
      callTime: '14:51',
      serviceType: 'Men\'s Haircut',
      callDurationSeconds: 0,
      callDurationMinutes: 0,
      cost: 0,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'zakwayne99@gmail.com',
      phoneNumber: '6579448240',
      name: 'zak',
      bookingStatus: 'confirmed',
      callDate: '2026-02-05',
      callTime: '23:20',
      serviceType: 'Men\'s Haircut',
      callDurationSeconds: 0,
      callDurationMinutes: 0,
      cost: 0,
      afterHoursBeforeHours: 'After Hours',
    },
    {
      email: 'sam@gmail.com',
      phoneNumber: '107207307',
      name: 'sam',
      bookingStatus: 'updated/rescheduled',
      callDate: '2026-02-08',
      callTime: '15:36',
      serviceType: 'Women\'s Haircut',
      callDurationSeconds: 0,
      callDurationMinutes: 0,
      cost: 0,
      afterHoursBeforeHours: 'Active Hours',
    },
    {
      email: 'sam@gmail.com',
      phoneNumber: '123456789',
      name: 'sam',
      bookingStatus: 'confirmed',
      callDate: '2026-02-08',
      callTime: '15:58',
      serviceType: 'Men\'s Haircut',
      callDurationSeconds: 0,
      callDurationMinutes: 0,
      cost: 0,
      afterHoursBeforeHours: 'Active Hours',
    },
  ];
}