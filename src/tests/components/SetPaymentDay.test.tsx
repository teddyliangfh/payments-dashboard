import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RootProvider from '@/app/rootProvider';
import { SetPaymentDay } from '../../components/setPaymentDay';
import { describe, it, expect, vi } from 'vitest';
import { paymentPlanData } from '@/mock/paymentPlan';


const mockOnUpdateSuccess = vi.fn();

const mockPaymentPlan = paymentPlanData;

const renderComponent = (component: React.ReactElement) => {
    return render(<RootProvider>{component}</RootProvider>);
};

beforeAll(() => {
    Element.prototype.scrollTo = () => { };
});

describe('SetPaymentDay', () => {
    it('should render the component correctly', () => {
        renderComponent(<SetPaymentDay paymentPlan={mockPaymentPlan} onUpdateSuccess={mockOnUpdateSuccess} />);
        expect(screen.queryByText('Adjust Your Payment Day')).toBeInTheDocument();
        expect(screen.getByText('Current Payment Day:')).toBeInTheDocument();
        expect(screen.getByText('Next Updated Payment Date:')).toBeInTheDocument();
        expect(screen.getByText('Select Day')).toBeInTheDocument();
        expect(screen.getByText('Change Payment Day')).toBeInTheDocument();
        expect(screen.getByTestId('selector')).toBeInTheDocument();
        expect(screen.getByTestId('change-day-button')).toBeInTheDocument();
    });

    it('should update the next payment date when a day is selected', () => {
        renderComponent(<SetPaymentDay paymentPlan={mockPaymentPlan} onUpdateSuccess={mockOnUpdateSuccess} />);
        () => { fireEvent.click(screen.getByText('Select Day')) };
        () => { fireEvent.click(screen.getByText('Monday')) };
        expect(screen.getByText('2/1/2025')).toBeInTheDocument();
    });
});