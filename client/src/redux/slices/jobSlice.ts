
import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Service } from '../../api/endpoints/services';
import type { Jobsite, JobsState, RootState } from '../../lib/types/types';


const initialState: JobsState = {
  jobsites: [],
  loading: false,
  error: null,
};

export const fetchJobsites = createAsyncThunk<
  Jobsite[],
  void,
  { rejectValue: string }
>(
  'jobsites/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const jobsites = await Service.getAllJobsites();
      return jobsites;
    } catch (error: unknown) {
      console.error('Error in fetchProfile:', error);
      return rejectWithValue(
        error instanceof Error ? error.message : 'Fetch profile failed'
      );
    }
  }
);

export const createJobsite = createAsyncThunk<
  Jobsite,
  Omit<Jobsite, 'id'>,
  { rejectValue: string }
>(
  'jobsites/create',
  async (newJobsite, { rejectWithValue }) => {
    try {
      const createdJobsite = await Service.createJobsite(newJobsite);
      return createdJobsite;
    } catch (error: unknown) {
      console.error('Error in createJobsite:', error);
      return rejectWithValue(
        error instanceof Error ? error.message : 'Create jobsite failed'
      );
    }
  },
);

export const fetchJobsiteById = createAsyncThunk<
  Jobsite,
  string,
  { rejectValue: string }
>('jobsites/fetchById', async (id, { rejectWithValue }) => {
  try {
    const jobsite = await Service.getJobsiteById(id);
    return jobsite;
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch jobsite'
    );
  }
});

// --- Jobsite Slice Definition ---
const jobsiteSlice = createSlice({
  name: 'jobsites',
  initialState,
  reducers: {
    // clearJobsites: (state) => {
    //   state.jobsites = [];
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsites.fulfilled, (state, action: PayloadAction<Jobsite[]>) => {
        state.loading = false;
        state.jobsites = action.payload;
        state.error = null;
      })
      .addCase(fetchJobsites.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch jobsites.';
        state.jobsites = [];
      })
      .addCase(createJobsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJobsite.fulfilled, (state, action: PayloadAction<Jobsite>) => {
        state.loading = false;
        state.jobsites.push(action.payload); 
      })
      .addCase(createJobsite.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to create jobsite.';
      })
      .addCase(fetchJobsiteById.fulfilled, (state, action: PayloadAction<Jobsite>) => {
        const existing = state.jobsites.find(j => j.id === action.payload.id);
        if (!existing) {
          state.jobsites.push(action.payload);
        }
      });             
      
  },
});

export default jobsiteSlice.reducer;

// --- Selectors ---
export const selectJobsitesState = (state: RootState) => state.jobs;
export const selectAllJobsites = (state: RootState) => state.jobs.jobsites;
export const selectJobsitesLoading = (state: RootState) => state.jobs.loading;
export const selectJobsitesError = (state: RootState) => state.jobs.error;
export const selectJobsiteById = createSelector(
  [selectAllJobsites, (state: RootState, jobsiteId: string) => jobsiteId],
  (jobsites, jobsiteId) => jobsites.find((job) => job.id === jobsiteId)
);