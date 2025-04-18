import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/server';

export async function GET(request: NextRequest) {
  const day = request.nextUrl.searchParams.get('day');
  const start = request.nextUrl.searchParams.get('start');
  const end = request.nextUrl.searchParams.get('end');
  
  try {
    // If start and end dates are provided, fetch events for the date range
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      
      // Set end date to end of day
      endDate.setHours(23, 59, 59, 999);
      
      const { data, error } = await supabase
        .from('events')
        .select('id, timestamp, name, description, name_cn, description_cn')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())
        .order('timestamp', { ascending: true });
      
      if (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
      }
      
      return NextResponse.json(data || []);
    }
    
    // If only start date is provided, fetch events from that date forward
    if (start) {
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('events')
        .select('id, timestamp, name, description, name_cn, description_cn')
        .gte('timestamp', startDate.toISOString())
        .order('timestamp', { ascending: true });
      
      if (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
      }
      
      return NextResponse.json(data || []);
    }
    
    // If a specific day is provided, fetch events for that day
    if (day) {
      // Convert the day string to a Date object
      const dateObj = new Date(day);
      
      // Create start and end of day timestamps
      const startOfDay = new Date(dateObj);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(dateObj);
      endOfDay.setHours(23, 59, 59, 999);
      
      // Query events for the specified day
      const { data, error } = await supabase
        .from('events')
        .select('id, timestamp, name, description, name_cn, description_cn')
        .gte('timestamp', startOfDay.toISOString())
        .lte('timestamp', endOfDay.toISOString())
        .order('timestamp', { ascending: true });
      
      if (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
      }
      
      return NextResponse.json(data || []);
    }
    
    // If no parameters are provided, return an error
    return NextResponse.json({ error: 'No date parameters provided' }, { status: 400 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
  }
} 