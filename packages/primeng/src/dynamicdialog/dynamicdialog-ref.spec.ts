import { DynamicDialogRef } from './dynamicdialog-ref';

describe('DynamicDialogRef', () => {
    let ref: DynamicDialogRef;

    beforeEach(() => {
        ref = new DynamicDialogRef();
    });

    describe('close', () => {
        it('should emit the result through onClose', () => {
            const spy = vi.fn();
            ref.onClose.subscribe(spy);

            ref.close('result-value');

            expect(spy).toHaveBeenCalledWith('result-value');
        });

        it('should emit undefined when no result is provided', () => {
            const spy = vi.fn();
            ref.onClose.subscribe(spy);

            ref.close();

            expect(spy).toHaveBeenCalledWith(undefined);
        });

        it('should complete onClose after the teardown delay', () => {
            vi.useFakeTimers();
            try {
                const completeSpy = vi.fn();
                ref.onClose.subscribe({ complete: completeSpy });

                ref.close('done');
                expect(completeSpy).not.toHaveBeenCalled();

                vi.advanceTimersByTime(1000);
                expect(completeSpy).toHaveBeenCalledTimes(1);
            } finally {
                vi.useRealTimers();
            }
        });
    });

    describe('destroy', () => {
        it('should emit through onDestroy', () => {
            const spy = vi.fn();
            ref.onDestroy.subscribe(spy);

            ref.destroy();

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('drag, resize and maximize callbacks', () => {
        it('should forward dragStart events', () => {
            const spy = vi.fn();
            const event = new MouseEvent('mousedown');
            ref.onDragStart.subscribe(spy);

            ref.dragStart(event);

            expect(spy).toHaveBeenCalledWith(event);
        });

        it('should forward dragEnd events', () => {
            const spy = vi.fn();
            const event = new MouseEvent('mouseup');
            ref.onDragEnd.subscribe(spy);

            ref.dragEnd(event);

            expect(spy).toHaveBeenCalledWith(event);
        });

        it('should forward resizeInit events', () => {
            const spy = vi.fn();
            const event = new MouseEvent('mousedown');
            ref.onResizeInit.subscribe(spy);

            ref.resizeInit(event);

            expect(spy).toHaveBeenCalledWith(event);
        });

        it('should forward resizeEnd events', () => {
            const spy = vi.fn();
            const event = new MouseEvent('mouseup');
            ref.onResizeEnd.subscribe(spy);

            ref.resizeEnd(event);

            expect(spy).toHaveBeenCalledWith(event);
        });

        it('should forward the maximize value', () => {
            const spy = vi.fn();
            ref.onMaximize.subscribe(spy);

            ref.maximize({ maximized: true });

            expect(spy).toHaveBeenCalledWith({ maximized: true });
        });
    });
});
